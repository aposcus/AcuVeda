import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Instagram, Github } from 'lucide-react';

const ContactPage = () => {
  const { t } = useTranslation();

  const members = [
    {
      name: "Soumit Saha",
      phone: "8902361622",
      email: "soumitsaha2005@gmial.com",
      instagram: "the_real_hutom",
      github: "soumitsaha2005-png"
    },
    {
      name: "Ritik Negi",
      email: "ritiknegimail@gmail.com",
      instagram: "aposcus",
      github: "aposcus"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <Card key={index} className="card-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {member.name}
                </CardTitle>
                <CardDescription>
                  {t('contact.teamMember')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {member.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a 
                      href={`tel:${member.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      +91 {member.phone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {member.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-primary" />
                  <a 
                    href={`https://instagram.com/${member.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    @{member.instagram}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <a 
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {member.github}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {t('contact.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;