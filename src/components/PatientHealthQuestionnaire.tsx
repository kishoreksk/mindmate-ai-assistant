
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText } from "lucide-react";

interface PatientHealthQuestionnaireProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const PatientHealthQuestionnaire = ({ onClose, onSubmit }: PatientHealthQuestionnaireProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",
    aptSuite: "",
    city: "",
    state: "",
    zipCode: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    treatmentInterest: "",
    medicationHistory: "",
  });

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could notice. Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (questionKey: string, value: string) => {
    setFormData({
      ...formData,
      [questionKey]: value,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Patient Health Questionnaire
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="aptSuite">Apt/Suite</Label>
                <Input
                  id="aptSuite"
                  name="aptSuite"
                  value={formData.aptSuite}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Health Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Over the last two weeks, how often have you been bothered by any of the following problems?
            </h3>
            
            {questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <Label className="text-sm font-medium">{index + 1}. {question}</Label>
                <RadioGroup
                  value={formData[`question${index + 1}` as keyof typeof formData]}
                  onValueChange={(value) => handleRadioChange(`question${index + 1}`, value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-at-all" id={`q${index + 1}-1`} />
                    <Label htmlFor={`q${index + 1}-1`}>Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="several-days" id={`q${index + 1}-2`} />
                    <Label htmlFor={`q${index + 1}-2`}>Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="more-than-half" id={`q${index + 1}-3`} />
                    <Label htmlFor={`q${index + 1}-3`}>More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nearly-every-day" id={`q${index + 1}-4`} />
                    <Label htmlFor={`q${index + 1}-4`}>Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          {/* Additional Questions */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">
                Would you be interested in learning more about a safe, effective, non-drug treatment for depression?
              </Label>
              <RadioGroup
                value={formData.treatmentInterest}
                onValueChange={(value) => handleRadioChange('treatmentInterest', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="treatment-yes" />
                  <Label htmlFor="treatment-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="treatment-no" />
                  <Label htmlFor="treatment-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">
                How many anti-depressant prescription medications do you currently take or have tried in the past?
              </Label>
              <RadioGroup
                value={formData.medicationHistory}
                onValueChange={(value) => handleRadioChange('medicationHistory', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="meds-0" />
                  <Label htmlFor="meds-0">0</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="meds-1" />
                  <Label htmlFor="meds-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-4" id="meds-2-4" />
                  <Label htmlFor="meds-2-4">2-4</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5+" id="meds-5plus" />
                  <Label htmlFor="meds-5plus">5+</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="meds-not-sure" />
                  <Label htmlFor="meds-not-sure">Not Sure</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientHealthQuestionnaire;
