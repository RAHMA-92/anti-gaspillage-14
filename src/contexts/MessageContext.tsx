import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  productId?: number;
  recipient?: string;
  senderAvatar?: string;
  isRead?: boolean;
}

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  conversations: { [key: string]: Message[] };
  initializeDemoData: () => void;
  unreadCount: number;
  markAsRead: (conversationKey: string) => void;
  getIntelligentResponse: (userMessage: string, productName?: string) => string;
  simulateProductInterest: (productName: string, userName: string) => Message;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

// Demo users with realistic data
const demoUsers = [
  {
    name: "Sarah Benali",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=100&h=100&fit=crop&crop=face",
    city: "Alger"
  },
  {
    name: "Ahmed Khelil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    city: "Oran"
  },
  {
    name: "Amina Djebbar",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    city: "Constantine"
  },
  {
    name: "Youcef Meziane",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    city: "Annaba"
  }
];

// Intelligent response patterns
const responsePatterns = {
  greeting: [
    "Bonjour ! Comment allez-vous ?",
    "Salut ! Merci de m'avoir contacté.",
    "Bonsoir ! Ravi de vous entendre.",
  ],
  availability: [
    "Oui, le produit est encore disponible ! Quand souhaitez-vous le récupérer ?",
    "Parfait ! Il est toujours là. Vous pouvez passer quand vous voulez.",
    "Bien sûr, il vous attend ! À quelle heure vous arrange ?",
  ],
  meetup: [
    "On peut se voir demain après-midi si ça vous va ?",
    "Je suis libre ce soir vers 18h, ça marche pour vous ?",
    "Que diriez-vous de nous retrouver demain matin ?",
  ],
  thanks: [
    "Merci beaucoup pour votre intérêt !",
    "C'est très gentil de votre part !",
    "Je vous remercie, c'est formidable !",
  ],
  condition: [
    "Le produit est en très bon état, ne vous inquiétez pas.",
    "Il est parfaitement conservé et encore frais.",
    "Tout va bien, il est comme neuf !",
  ],
  location: [
    "Je suis proche du centre-ville, c'est facile d'accès.",
    "L'adresse est pratique, pas de souci pour se garer.",
    "C'est à 5 minutes de la station de métro.",
  ]
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<{ [key: string]: Message[] }>({});
  const [unreadCount, setUnreadCount] = useState(0);

  const getIntelligentResponse = (userMessage: string, productName?: string) => {
    const message = userMessage.toLowerCase();
    
    // Determine response category based on message content
    if (message.includes('bonjour') || message.includes('salut') || message.includes('bonsoir')) {
      return responsePatterns.greeting[Math.floor(Math.random() * responsePatterns.greeting.length)];
    }
    
    if (message.includes('disponible') || message.includes('encore là') || message.includes('réservé')) {
      return responsePatterns.availability[Math.floor(Math.random() * responsePatterns.availability.length)];
    }
    
    if (message.includes('quand') || message.includes('heure') || message.includes('rendez-vous') || message.includes('récupérer')) {
      return responsePatterns.meetup[Math.floor(Math.random() * responsePatterns.meetup.length)];
    }
    
    if (message.includes('état') || message.includes('qualité') || message.includes('frais') || message.includes('bon')) {
      return responsePatterns.condition[Math.floor(Math.random() * responsePatterns.condition.length)];
    }
    
    if (message.includes('où') || message.includes('adresse') || message.includes('lieu') || message.includes('endroit')) {
      return responsePatterns.location[Math.floor(Math.random() * responsePatterns.location.length)];
    }
    
    if (message.includes('merci') || message.includes('super') || message.includes('parfait')) {
      return responsePatterns.thanks[Math.floor(Math.random() * responsePatterns.thanks.length)];
    }
    
    // Default contextual responses
    const defaultResponses = [
      "Parfait ! N'hésitez pas si vous avez d'autres questions.",
      "Très bien ! Je reste à votre disposition.",
      "D'accord ! Faites-moi savoir si vous avez besoin d'autre chose.",
      "Entendu ! On se tient au courant alors.",
      "Ça marche ! À bientôt j'espère."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Simulate receiving interest messages when products are shared
  const simulateProductInterest = (productName: string, userName: string) => {
    const interestedUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    const interestMessages = [
      `Bonjour ! Je suis intéressé(e) par votre ${productName}. Est-il encore disponible ?`,
      `Salut ! Votre ${productName} m'intéresse beaucoup. Peut-on se voir pour le récupérer ?`,
      `Bonsoir ! Je voudrais savoir si votre ${productName} est toujours libre ?`,
      `Hello ! Votre annonce pour ${productName} m'a attiré. C'est encore dispo ?`
    ];

    const conversationKey = interestedUser.name;
    const interestMessage: Message = {
      id: Date.now(),
      sender: interestedUser.name,
      content: interestMessages[Math.floor(Math.random() * interestMessages.length)],
      timestamp: new Date().toISOString(),
      senderAvatar: interestedUser.avatar,
      isRead: false
    };

    setConversations(prev => ({
      ...prev,
      [conversationKey]: [...(prev[conversationKey] || []), interestMessage]
    }));

    setUnreadCount(prev => prev + 1);

    return interestMessage;
  };

  const initializeDemoData = () => {
    // Start with empty conversations - user initiates contact
    setConversations({});
    setUnreadCount(0);
  };

  useEffect(() => {
    // Initialize with empty state
    initializeDemoData();
  }, []);

  const addMessage = (newMessage: Omit<Message, 'id' | 'timestamp'>) => {
    console.log("Adding message:", newMessage);
    
    const message: Message = {
      ...newMessage,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setMessages(prev => [message, ...prev]);
    
    // Create conversation key
    let conversationKey: string;
    
    if (newMessage.recipient) {
      conversationKey = newMessage.recipient;
    } else if (newMessage.productId) {
      conversationKey = `Product-${newMessage.productId}`;
    } else {
      conversationKey = 'General';
    }
    
    console.log("Conversation key:", conversationKey);
    
    // Add message to conversation
    setConversations(prev => {
      const updated = {
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), message]
      };
      console.log("Updated conversations:", updated);
      return updated;
    });

    // Check if this is a user message that needs a response
    const isUserMessage = message.sender === "Vous" || message.sender.includes("Utilisateur") || message.sender.includes("User");
    
    console.log("Is user message:", isUserMessage, "Sender:", message.sender);
    
    if (isUserMessage) {
      console.log("Setting up automatic response...");
      
      // Generate response after a realistic delay
      setTimeout(() => {
        console.log("Generating automatic response...");
        
        const intelligentResponse = getIntelligentResponse(message.content);
        const responseUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        
        const responseMessage: Message = {
          id: Date.now() + Math.random() * 1000,
          sender: conversationKey,
          content: intelligentResponse,
          timestamp: new Date().toISOString(),
          senderAvatar: responseUser.avatar,
          isRead: false
        };
        
        console.log("Adding response message:", responseMessage);
        
        // Add the response to conversations
        setConversations(prevConversations => {
          const updated = {
            ...prevConversations,
            [conversationKey]: [...(prevConversations[conversationKey] || []), responseMessage]
          };
          console.log("Conversations after response:", updated);
          return updated;
        });
        
        // Increment unread count
        setUnreadCount(prev => {
          const newCount = prev + 1;
          console.log("New unread count:", newCount);
          return newCount;
        });
        
      }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
    }
  };

  const markAsRead = (conversationKey: string) => {
    setConversations(prev => ({
      ...prev,
      [conversationKey]: prev[conversationKey]?.map(msg => ({ ...msg, isRead: true })) || []
    }));
    
    // Recalculate unread count
    setUnreadCount(prevCount => {
      const newCount = Object.values(conversations).reduce((count, msgs) => {
        return count + msgs.filter(msg => !msg.isRead && msg.sender !== "Vous" && !msg.sender.includes("Utilisateur")).length;
      }, 0);
      return newCount;
    });
  };

  return (
    <MessageContext.Provider value={{
      messages,
      addMessage,
      conversations,
      initializeDemoData,
      unreadCount,
      markAsRead,
      getIntelligentResponse,
      simulateProductInterest
    }}>
      {children}
    </MessageContext.Provider>
  );
};
