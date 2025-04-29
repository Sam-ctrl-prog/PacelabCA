import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Users, Save, ArrowLeft, UserPlus, RefreshCcw } from "lucide-react";
import { CampusAmbassador } from "@shared/schema";
import { useQueryClient } from "@tanstack/react-query";

interface NewAmbassadorForm {
  name: string;
  college: string;
  bio: string;
  points: number;
}

const Admin = () => {
  const [, setLocation] = useLocation();
  const [ambassadors, setAmbassadors] = useState<CampusAmbassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<NewAmbassadorForm>({
    name: '',
    college: '',
    bio: '',
    points: 0
  });

  const queryClient = useQueryClient();

  const fetchAmbassadors = () => {
    setLoading(true);
    fetch('/api/campus-ambassadors')
      .then(res => res.json())
      .then(data => {
        setAmbassadors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const handlePointsChange = (id: number, points: number) => {
    setAmbassadors(prevAmbassadors => 
      prevAmbassadors.map(ambassador => 
        ambassador.id === id ? {...ambassador, points} : ambassador
      )
    );
  };

  const handleSaveChanges = async () => {
    setSaveStatus('saving');

    try {
      const updatePromises = ambassadors.map(ambassador => {
        return fetch(`/api/campus-ambassadors/${ambassador.id}/points`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: ambassador.points }),
        });
      });

      await Promise.all(updatePromises);
      queryClient.invalidateQueries({ queryKey: ['/api/campus-ambassadors'] });
      setSaveStatus('success');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveStatus('error');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }));
  };

  const handleAddNewAmbassador = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.college || !formData.bio) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/campus-ambassadors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new ambassador');
      }

      const newAmbassador = await response.json();
      setAmbassadors(prev => [...prev, newAmbassador]);
      queryClient.invalidateQueries({ queryKey: ['/api/campus-ambassadors'] });

      setFormData({
        name: '',
        college: '',
        bio: '',
        points: 0
      });
      setFormVisible(false);

    } catch (error) {
      console.error('Error adding new ambassador:', error);
      alert('Failed to add new ambassador. Please try again.');
    }
  };

  const handleBackToDashboard = () => {
    setLocation('/');
  };

  const handleRefresh = () => {
    fetchAmbassadors();
  };

  return (
    <div className="min-h-screen font-inter dark">
      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

        <header className="relative z-10 p-6 backdrop-blur-lg border-b border-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={32} className="text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
            <p className="text-muted-foreground">Manage Campus Ambassador Program</p>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 hover:bg-card/50 transition-colors"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 hover:bg-card/50 transition-colors"
              onClick={handleRefresh}
            >
              <RefreshCcw size={16} />
              Refresh
            </motion.button>

            <div className="flex-1" />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-lg border border-primary/30 hover:bg-primary/30 transition-colors"
              onClick={() => setFormVisible(!formVisible)}
            >
              <UserPlus size={16} />
              {formVisible ? 'Cancel' : 'Add New Ambassador'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-lg border transition-colors
                ${saveStatus === 'idle' ? 'bg-accent/20 border-accent/30 hover:bg-accent/30' :
                  saveStatus === 'saving' ? 'bg-yellow-500/20 border-yellow-500/30' :
                  saveStatus === 'success' ? 'bg-green-500/20 border-green-500/30' :
                  'bg-red-500/20 border-red-500/30'}`}
              onClick={handleSaveChanges}
              disabled={saveStatus === 'saving'}
            >
              <Save size={16} />
              {saveStatus === 'idle' && 'Save Changes'}
              {saveStatus === 'saving' && 'Saving...'}
              {saveStatus === 'success' && 'Saved!'}
              {saveStatus === 'error' && 'Error!'}
            </motion.button>
          </div>

          <AnimatePresence>
            {formVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 bg-card/30 backdrop-blur-lg rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <UserPlus size={24} className="text-primary" />
                  <h2 className="text-2xl font-bold">Add New Ambassador</h2>
                </div>

                <form onSubmit={handleAddNewAmbassador} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background/50 rounded-lg border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">College</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background/50 rounded-lg border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background/50 rounded-lg border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">Starting Points</label>
                    <input
                      type="number"
                      name="points"
                      value={formData.points}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background/50 rounded-lg border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      min="0"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setFormVisible(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-card/30 rounded-lg border border-border/50 hover:bg-card/50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Add Ambassador
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-card/30 backdrop-blur-lg rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">Campus Ambassadors</h2>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading ambassadors data...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border/50">
                      <th className="pb-3 text-muted-foreground font-medium">ID</th>
                      <th className="pb-3 text-muted-foreground font-medium">Name</th>
                      <th className="pb-3 text-muted-foreground font-medium">College</th>
                      <th className="pb-3 text-muted-foreground font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ambassadors.map((ambassador, index) => (
                      <motion.tr
                        key={ambassador.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-4">{ambassador.id}</td>
                        <td className="py-4">{ambassador.name}</td>
                        <td className="py-4">{ambassador.college}</td>
                        <td className="py-4">
                          <input
                            type="number"
                            value={ambassador.points}
                            onChange={(e) => handlePointsChange(ambassador.id, parseInt(e.target.value))}
                            className="w-24 px-3 py-1 bg-background/50 rounded border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Admin;