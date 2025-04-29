import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CampusAmbassador } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import LeaderboardHeader from "@/components/LeaderboardHeader";
import LeaderboardFooter from "@/components/LeaderboardFooter";
import sreeImage from "@/lib/sree.jpg";

import paceLabLogo from "@/lib/PACELAB - Silver logo (2).png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Medal, Award, Search, Filter, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedUser, setSelectedUser] = useState<CampusAmbassador | null>(
    null,
  );

  const { data: ambassadors, isLoading } = useQuery<CampusAmbassador[]>({
    queryKey: ["/api/campus-ambassadors"],
  });

  const filteredAmbassadors = ambassadors?.filter(
    (ambassador) =>
      ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambassador.college.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const topThree = filteredAmbassadors?.slice(0, 3) || [];

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-400" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-orange-600" />;
    return `#${index + 1}`;
  };

  return (
    <div className={`min-h-screen font-inter ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Hero section with integrated logo and title */}
      <div className="bg-gradient-to-b from-background to-background/80 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={paceLabLogo}
              alt="PACELAB Logo"
              className="h-16 mb-4 drop-shadow-lg"
            />

            <LeaderboardHeader />
          </div>
        </div>
      </div>

      {/* Leaderboard Section with refined styling */}
      <main className="main relative max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden"
        >
          <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Current Leaderboard</h2>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by name or college..."
                    className="pl-10 w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-2 rounded-lg border border-border/50 hover:bg-accent/10">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4 p-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
          ) : (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    <TableHead className="text-right">Revenue (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAmbassadors?.map((ambassador, index) => (
                    <TableRow
                      key={ambassador.id}
                      className={`cursor-pointer hover:bg-accent/5 ${
                        index === 0
                          ? "bg-blue-900/20"
                          : index === 1
                            ? "bg-gray-600/10"
                            : index === 2
                              ? "bg-amber-700/10"
                              : ""
                      }`}
                      onClick={() => setSelectedUser(ambassador)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center justify-center">
                          {getRankIcon(index)}
                        </div>
                      </TableCell>
                      <TableCell>{ambassador.name}</TableCell>
                      <TableCell>{ambassador.college}</TableCell>
                      <TableCell className="text-right font-bold">
                        {ambassador.points}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {ambassador.revenue || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl mx-auto mt-20 p-6 bg-card rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-4">{selectedUser.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {selectedUser.college}
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <span>Total Points</span>
                  <span className="text-2xl font-bold">
                    {selectedUser.points}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <span>Revenue Generated</span>
                  <span className="text-2xl font-bold">
                    ₹{selectedUser.revenue || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <span>Rank</span>
                  <span className="text-2xl font-bold">
                    #
                    {ambassadors?.findIndex((a) => a.id === selectedUser.id) +
                      1}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Footer with Prize Information */}
      <footer className="bg-gradient-to-b from-background/70 to-background/90 py-12 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Prize Worth Title */}
            <div className="text-center mb-8">
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mt-2"></div>
            </div>

            {/* Prize Structure Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Top 3 Prizes */}

              {/* 4th-10th Prizes */}

              {/* 11th-20th Prizes */}
            </div>
          </motion.div>
        </div>

        {/* Standard Footer Content */}
        <LeaderboardFooter />
      </footer>
    </div>
  );
};

export default Dashboard;
