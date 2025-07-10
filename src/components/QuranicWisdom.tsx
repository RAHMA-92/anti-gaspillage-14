import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

export const QuranicWisdom: React.FC = () => {
  const { t } = useLanguage();

  const verses = [
    {
      text: t('verse1'),
      reference: "القرآن الكريم 7:31"
    },
    {
      text: t('verse2'),
      reference: "القرآن الكريم 17:26"
    },
    {
      text: t('verse3'),
      reference: "القرآن الكريم 17:27"
    }
  ];

  return (
    <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
          <BookOpen className="h-6 w-6" />
          <span>{t('islamicWisdom')}</span>
          <Sparkles className="h-5 w-5 text-emerald-500" />
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          {t('quranVerses')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {verses.map((verse, index) => (
          <div key={index} className="relative">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-emerald-500 shadow-sm">
              <p className="text-sm leading-relaxed mb-2 text-gray-700 dark:text-gray-300">
                {verse.text}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {verse.reference}
              </p>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start space-x-2">
            <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
              {t('wasteReflection')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};