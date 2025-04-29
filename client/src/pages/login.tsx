import { useState } from "react";
import { useLocation } from "wouter";
import { Crown, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import paceLabLogo from "@/lib/PACELAB - Silver logo (2).png";

const Login = () => {
  const [, setLocation] = useLocation();
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCampusAmbassadorLogin = () => {
    setLocation("/dashboard");
  };

  const toggleAdminForm = () => {
    setShowAdminForm(!showAdminForm);
    setUsername("");
    setPassword("");
    setErrorMsg("");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen font-inter dark">
      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 py-16 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="max-w-md mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="login-card backdrop-blur-md bg-card/30 p-8 rounded-2xl border border-border/50"
          >
            <motion.img
              src={paceLabLogo}
              alt="PACELAB Logo"
              className="h-16 mx-auto mb-8 drop-shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Campus Ambassador Portal
              </h1>
              <p className="text-muted-foreground mt-2">
                Select how you would like to enter the system
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                className="w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
                onClick={handleCampusAmbassadorLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Crown className="h-5 w-5" />
                <span>Login as Campus Ambassador</span>
              </motion.button>
            </div>

            {showAdminForm && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleAdminLogin}
                className="mt-8 pt-8 border-t border-border/30"
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Admin Login
                </h2>

                {errorMsg && (
                  <div className="p-4 mb-6 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 rounded-lg bg-card/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-card/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full p-4 bg-primary text-primary-foreground rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
