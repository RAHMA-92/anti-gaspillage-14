
import { useLanguage } from "@/contexts/LanguageContext";
import { useMessages } from "@/contexts/MessageContext";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, User, Search, Phone, Video, MoreVertical, Smile, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const { t, language } = useLanguage();
  const { messages, conversations, addMessage, markAsRead, unreadCount } = useMessages();
  const { profileData } = useProfile();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation, conversations]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const currentUserName = profileData.name || "Vous";
    
    addMessage({
      sender: currentUserName,
      content: newMessage,
      recipient: selectedConversation
    });
    
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (conversationKey: string) => {
    setSelectedConversation(conversationKey);
    markAsRead(conversationKey);
  };

  const conversationsList = Object.keys(conversations).filter(key => 
    searchTerm === "" || 
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLastMessage = (conversationKey: string) => {
    const msgs = conversations[conversationKey];
    return msgs && msgs.length > 0 ? msgs[msgs.length - 1] : null;
  };

  const getUnreadCount = (conversationKey: string) => {
    const msgs = conversations[conversationKey] || [];
    return msgs.filter(msg => !msg.isRead && msg.sender !== "Vous" && !msg.sender.includes("Utilisateur")).length;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return date.toLocaleDateString();
  };

  // Mobile layout with back button
  if (isMobileView && selectedConversation) {
    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Mobile Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedConversation(null)}
              className="p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={conversations[selectedConversation]?.[0]?.senderAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {selectedConversation.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 text-sm">{selectedConversation}</h2>
              <p className="text-xs text-green-500">En ligne</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 p-2">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 p-2">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-3">
            {conversations[selectedConversation]?.map((message) => {
              const isCurrentUser = message.sender === (profileData.name || "Vous") || message.sender.includes("Utilisateur");
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {!isCurrentUser && (
                      <Avatar className="w-6 h-6 mb-1">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-gray-300">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                      }`}
                    >
                      <p className="text-sm break-words">{message.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Mobile Message Input */}
        <div className="p-3 bg-white border-t border-gray-200 safe-area-padding-bottom">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="rounded-full bg-gray-100 border-0 pr-12 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen bg-white flex ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Sidebar - Liste des conversations */}
      <div className={`${isMobileView ? 'w-full' : 'w-80'} border-r border-gray-200 flex flex-col ${selectedConversation && isMobileView ? 'hidden' : ''}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Messages
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher des conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-full"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversationsList.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {conversationsList.map((conversationKey) => {
                const lastMessage = getLastMessage(conversationKey);
                const isSelected = selectedConversation === conversationKey;
                const firstMessage = conversations[conversationKey]?.[0];
                const unreadCount = getUnreadCount(conversationKey);
                
                return (
                  <div
                    key={conversationKey}
                    onClick={() => handleSelectConversation(conversationKey)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={firstMessage?.senderAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {conversationKey.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900 truncate">
                            {conversationKey}
                          </p>
                          {lastMessage && (
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatTime(lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        
                        {lastMessage && (
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {lastMessage.sender === (profileData.name || "Vous") || lastMessage.sender.includes("Utilisateur") ? "Vous: " : ""}
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                      
                      {unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                {searchTerm ? "Aucune conversation trouvée" : "Aucune conversation"}
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Réservez un produit pour commencer une conversation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Chat Area */}
      {!isMobileView && (
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversations[selectedConversation]?.[0]?.senderAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedConversation.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedConversation}</h2>
                      <p className="text-sm text-green-500">En ligne</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {conversations[selectedConversation]?.map((message) => {
                    const isCurrentUser = message.sender === (profileData.name || "Vous") || message.sender.includes("Utilisateur");
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end gap-2 max-w-xs lg:max-w-md">
                          {!isCurrentUser && (
                            <Avatar className="w-8 h-8 mb-1">
                              <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gray-300 text-sm">
                                {message.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isCurrentUser
                                ? 'bg-blue-500 text-white rounded-br-md'
                                : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                            }`}
                          >
                            <p className="break-words">{message.content}</p>
                            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
                    <Smile className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="rounded-full bg-gray-100 border-0 pr-12"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sélectionnez une conversation
                </h3>
                <p className="text-gray-600">
                  Choisissez une conversation dans la liste pour commencer à échanger
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
