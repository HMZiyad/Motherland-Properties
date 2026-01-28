import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, Printer, Share2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function EMICalculator() {
  const { t } = useLanguage();
  const [plotValue, setPlotValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(30);
  const [tenure, setTenure] = useState(24);

  const calculations = useMemo(() => {
    const downPaymentAmount = (plotValue * downPayment) / 100;
    const loanAmount = plotValue - downPaymentAmount;
    const monthlyEMI = loanAmount / tenure;
    const totalAmount = plotValue;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyEMI,
      totalAmount,
    };
  }, [plotValue, downPayment, tenure]);

  const tenureOptions = [12, 24, 36];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `EMI Calculation from Motherland Properties:
Plot Value: ৳${plotValue.toLocaleString()}
Down Payment: ${downPayment}% (৳${calculations.downPaymentAmount.toLocaleString()})
Monthly EMI: ৳${Math.round(calculations.monthlyEMI).toLocaleString()}
Tenure: ${tenure} months`;

    if (navigator.share) {
      await navigator.share({ title: 'EMI Calculation', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Calculator className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('emi.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('emi.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="font-display">Calculate Your EMI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Plot Value */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t('emi.plotValue')}</Label>
                      <span className="font-semibold text-primary">৳{plotValue.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[plotValue]}
                      min={2000000}
                      max={20000000}
                      step={100000}
                      onValueChange={([value]) => setPlotValue(value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>৳20 Lac</span>
                      <span>৳2 Crore</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t('emi.downPayment')}</Label>
                      <span className="font-semibold text-primary">{downPayment}%</span>
                    </div>
                    <Slider
                      value={[downPayment]}
                      min={20}
                      max={60}
                      step={5}
                      onValueChange={([value]) => setDownPayment(value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>20%</span>
                      <span>60%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-4">
                    <Label>{t('emi.tenure')}</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {tenureOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setTenure(option)}
                          className={`py-3 rounded-lg font-semibold transition-colors ${
                            tenure === option
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {option} {t('emi.months')}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="font-display text-primary-foreground">Your EMI Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Monthly EMI */}
                  <div className="text-center py-6 bg-primary-foreground/10 rounded-2xl">
                    <p className="text-sm text-primary-foreground/80 mb-2">{t('emi.monthly')}</p>
                    <p className="font-display text-5xl font-bold">
                      ৳{Math.round(calculations.monthlyEMI).toLocaleString()}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/80">Plot Value</span>
                      <span className="font-semibold">৳{plotValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/80">Down Payment ({downPayment}%)</span>
                      <span className="font-semibold">৳{calculations.downPaymentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/80">Financed Amount</span>
                      <span className="font-semibold">৳{calculations.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/80">Tenure</span>
                      <span className="font-semibold">{tenure} Months</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-primary-foreground/80">{t('emi.total')}</span>
                      <span className="font-bold text-xl">৳{calculations.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={handlePrint}
                    >
                      <Printer className="w-4 h-4" />
                      {t('emi.print')}
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                      {t('emi.share')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Note */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                * This is an interest-free installment plan. No hidden charges.
              </p>
            </motion.div>
          </div>

          {/* Payment Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold text-center mb-8">Payment Schedule</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left">Month</th>
                      <th className="px-4 py-3 text-right">EMI</th>
                      <th className="px-4 py-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(Math.min(tenure, 6))].map((_, index) => {
                      const remaining = calculations.loanAmount - (calculations.monthlyEMI * (index + 1));
                      return (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 text-right font-semibold">
                            ৳{Math.round(calculations.monthlyEMI).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-muted-foreground">
                            ৳{Math.max(0, Math.round(remaining)).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                    {tenure > 6 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-center text-muted-foreground">
                          ... {tenure - 6} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
