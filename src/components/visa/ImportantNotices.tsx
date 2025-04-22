
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Bell, ShieldAlert } from 'lucide-react';

const ImportantNotices = () => {
  const { language } = useLanguage();
  
  const notices = [
    {
      id: 1,
      icon: <Bell className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Recent Policy Changes' : 'Cambios Recientes en Políticas',
      content: language === 'en'
        ? 'The U.S. Department of State has updated its visa reciprocity schedule for several countries. This may affect visa fees and validity periods. Additionally, interview waiver eligibility has been expanded for certain renewal applicants.'
        : 'El Departamento de Estado de EE.UU. ha actualizado su programa de reciprocidad de visas para varios países. Esto puede afectar las tarifas y períodos de validez de las visas. Además, la elegibilidad para exención de entrevista se ha expandido para ciertos solicitantes de renovación.'
    },
    {
      id: 2,
      icon: <Bell className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Embassy Updates' : 'Actualizaciones de Embajadas',
      content: language === 'en'
        ? 'The Schengen area consulates are currently experiencing unusually high application volumes, resulting in extended processing times. We recommend applying at least 3 months before planned travel. The Canadian embassy has also implemented a new online application system.'
        : 'Los consulados del área Schengen están experimentando actualmente volúmenes de solicitudes inusualmente altos, lo que resulta en tiempos de procesamiento extendidos. Recomendamos solicitar al menos 3 meses antes del viaje planificado. La embajada canadiense también ha implementado un nuevo sistema de solicitud en línea.'
    },
    {
      id: 3,
      icon: <ShieldAlert className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Scam Alerts' : 'Alertas de Estafas',
      content: language === 'en'
        ? 'We have received reports of fraudulent websites and individuals impersonating embassy officials and visa services. Remember that official communications will never request payment via wire transfer or gift cards. Always verify the legitimacy of visa websites by checking official embassy domains.'
        : 'Hemos recibido informes de sitios web fraudulentos e individuos que se hacen pasar por funcionarios de embajadas y servicios de visa. Recuerda que las comunicaciones oficiales nunca solicitarán pagos mediante transferencia bancaria o tarjetas de regalo. Siempre verifica la legitimidad de los sitios web de visas comprobando los dominios oficiales de las embajadas.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Important Notices' : 'Avisos Importantes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Stay informed about recent changes in visa policies, embassy updates, and security alerts that may affect your application.' 
              : 'Mantente informado sobre cambios recientes en políticas de visas, actualizaciones de embajadas y alertas de seguridad que pueden afectar tu solicitud.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <Card key={notice.id} className="p-6 border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                  {notice.icon}
                </div>
                <h3 className="text-xl font-bold">{notice.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {notice.content}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-6 border border-border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-800 mr-4 mt-1">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-400">
                  {language === 'en' ? 'Important Reminder' : 'Recordatorio Importante'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {language === 'en'
                    ? 'Be cautious of visa scams and fraudulent services. Official embassy and visa application websites typically end with government domains (.gov, .gob, etc.). Never share your personal information or make payments on unofficial websites. If you have any doubts, contact us or the embassy directly.'
                    : 'Ten cuidado con las estafas de visas y servicios fraudulentos. Los sitios web oficiales de embajadas y solicitudes de visas generalmente terminan con dominios gubernamentales (.gov, .gob, etc.). Nunca compartas tu información personal ni realices pagos en sitios web no oficiales. Si tienes alguna duda, contáctanos o comunícate directamente con la embajada.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImportantNotices;
