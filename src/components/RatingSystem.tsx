
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

export interface Review {
  id: number;
  productId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface RatingSystemProps {
  productId: number;
  currentUserId?: string;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ productId, currentUserId }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      productId: 1,
      userId: "user1",
      userName: "Sarah Benali",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Excellent produit, très frais et de qualité. Le vendeur était très sympa !",
      date: "2025-01-15",
      helpful: 8,
      verified: true
    },
    {
      id: 2,
      productId: 1,
      userId: "user2",
      userName: "Ahmed Khelil",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4,
      comment: "Bon rapport qualité-prix. Récupéré rapidement.",
      date: "2025-01-10",
      helpful: 3,
      verified: false
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const productReviews = reviews.filter(review => review.productId === productId);
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: productReviews.filter(review => review.rating === stars).length,
    percentage: productReviews.length > 0 
      ? (productReviews.filter(review => review.rating === stars).length / productReviews.length) * 100 
      : 0
  }));

  const handleSubmitReview = () => {
    if (!currentUserId) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour laisser un avis",
        variant: "destructive"
      });
      return;
    }

    if (newReview.rating === 0) {
      toast({
        title: "Note requise",
        description: "Veuillez donner une note avant de publier votre avis",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now(),
      productId,
      userId: currentUserId,
      userName: "Vous",
      rating: newReview.rating,
      comment: newReview.comment || "",
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);

    toast({
      title: "Avis publié !",
      description: "Merci pour votre retour d'expérience",
    });
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Avis et évaluations
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-gray-600">
              {productReviews.length} avis
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-3">{stars}</span>
                <Star className="w-4 h-4 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Button */}
        {!showReviewForm && (
          <Button 
            onClick={() => setShowReviewForm(true)}
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Laisser un avis
          </Button>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <Card className="border-2 border-eco-200">
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre note *
                </label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview(prev => ({ ...prev, rating }))
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre commentaire (optionnel)
                </label>
                <Textarea
                  placeholder="Partagez votre expérience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSubmitReview}>
                  Publier l'avis
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowReviewForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {productReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun avis pour ce produit</p>
              <p className="text-sm">Soyez le premier à laisser un avis !</p>
            </div>
          ) : (
            productReviews.map((review) => (
              <Card key={review.id} className="border-gray-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Achat vérifié
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      {review.comment && (
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHelpful(review.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Utile ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingSystem;
