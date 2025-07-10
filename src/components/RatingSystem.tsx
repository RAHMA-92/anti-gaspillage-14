import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MessageSquare, User, ThumbsUp, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface RatingSystemProps {
  userId: string;
  userName: string;
  userAvatar?: string;
}

export const RatingSystem: React.FC<RatingSystemProps> = ({ userId, userName, userAvatar }) => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      reviewerId: 'user1',
      reviewerName: 'Fatima Ben Ahmed',
      rating: 5,
      comment: 'Très fiable ! J\'ai récupéré plusieurs produits, toujours en bon état.',
      date: '2024-01-15',
      helpful: 3
    },
    {
      id: '2',
      reviewerId: 'user2',
      reviewerName: 'Mohammed Saidi',
      rating: 4,
      comment: 'Personne de confiance, communication facile.',
      date: '2024-01-10',
      helpful: 2
    }
  ]);
  
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = () => {
    if (newRating === 0) {
      toast({
        title: t('error'),
        description: t('rating') + ' ' + t('fillRequiredFields'),
        variant: "destructive",
      });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      reviewerId: 'current-user',
      reviewerName: 'Utilisateur Actuel',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setIsDialogOpen(false);
    
    toast({
      title: t('reviews'),
      description: t('addedSuccessfully'),
    });
  };

  const renderStars = (rating: number, interactive = false, size = 20) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`cursor-pointer transition-colors ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setNewRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{t('userReviews')}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t('addReview')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('addReview')} - {userName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('rating')}</label>
                  <div className="mt-2">
                    {renderStars(newRating, true, 24)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">{t('reviewComment')}</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('reviewComment')}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleSubmitReview} className="w-full">
                  {t('submitReview')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Compact Average Rating */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), false, 20)}
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {t('trustworthy')}
            </Badge>
          </div>
        </div>

        {/* Compact Reviews List - Show only last 2 reviews */}
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-1 opacity-50" />
              <p className="text-sm">{t('noReviews')}</p>
            </div>
          ) : (
            reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{review.reviewerName}</span>
                    {renderStars(review.rating, false, 14)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-xs text-gray-600 line-clamp-2">{review.comment}</p>
                )}
              </div>
            ))
          )}
          {reviews.length > 2 && (
            <p className="text-center text-xs text-muted-foreground">
              +{reviews.length - 2} autres avis...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};