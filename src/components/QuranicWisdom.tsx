import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Sparkles } from 'lucide-react';

export const QuranicWisdom: React.FC = () => {
  const { t, language } = useLanguage();

  const verses = [
    {
      arabic: "وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
      french: "Et mangez et buvez mais ne gaspillez pas car Allah n'aime pas les gaspilleurs",
      english: "And eat and drink but waste not by excess, for Allah loves not the wasters",
      reference: "سورة الأعراف آية 31"
    },
    {
      arabic: "وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا",
      french: "Et donne au proche parent son dû, ainsi qu'au pauvre et au voyageur, et ne gaspille pas",
      english: "And give the relative his right, and the poor and the traveler, and do not spend wastefully",
      reference: "سورة الإسراء آية 26"
    },
    {
      arabic: "إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ ۖ وَكَانَ الشَّيْطَانُ لِرَبِّهِ كَفُورًا",
      french: "Les gaspilleurs sont vraiment les frères des diables et le Diable est très ingrat envers son Seigneur",
      english: "Indeed, the wasteful are brothers of the devils, and ever has Satan been to his Lord ungrateful",
      reference: "سورة الإسراء آية 27"
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
      <CardContent className="space-y-4">
        {verses.map((verse, index) => (
          <div key={index} className="relative">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-emerald-500 shadow-sm">
              {/* Arabic text */}
              <p className="text-right text-lg leading-relaxed mb-3 font-arabic text-emerald-900 dark:text-emerald-100" dir="rtl">
                {verse.arabic}
              </p>
              
              {/* Translation based on current language */}
              <p className="text-sm leading-relaxed mb-2 text-gray-700 dark:text-gray-300 italic">
                "{language === 'en' ? verse.english : verse.french}"
              </p>
              
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {verse.reference}
              </p>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start space-x-2">
            <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
              {language === 'ar' ? 
                "يعلمنا الإسلام أهمية تجنب الإسراف والتبذير. بمشاركة الطعام والموارد، نتبع التعاليم النبيلة لديننا." :
                language === 'en' ? 
                "Islam teaches us the importance of avoiding waste and excess. By sharing food and resources, we follow the noble teachings of our religion." :
                "L'Islam nous enseigne l'importance d'éviter le gaspillage et l'excès. En partageant la nourriture et les ressources, nous suivons les nobles enseignements de notre religion."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};