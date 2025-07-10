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
      <CardContent>
        {/* Average Rating */}
        <div className="flex items-center space-x-4 mb-6 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('averageRating')}
            </div>
          </div>
          <div className="flex-1">
            {renderStars(Math.round(averageRating), false, 24)}
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>{t('trustworthy')}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{t('reliable')}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{t('noReviews')}</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.reviewerName}</span>
                      {renderStars(review.rating, false, 16)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-sm mt-2 mb-3">{review.comment}</p>
                )}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {review.helpful}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};