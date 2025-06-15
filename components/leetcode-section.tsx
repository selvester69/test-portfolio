import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Trophy, Calendar, Target, TrendingUp, Award } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getLeetCodeInfo } from "@/lib/data"

export function LeetCodeSection() {
  const leetcodeInfo = getLeetCodeInfo()

  // Generate a simple heatmap visualization
  const getHeatmapColor = (count: number) => {
    if (count === 0) return "bg-zinc-800"
    if (count <= 2) return "bg-green-900/50"
    if (count <= 4) return "bg-green-700/70"
    return "bg-green-500"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10"
      case "medium":
        return "text-yellow-400 bg-yellow-400/10"
      case "hard":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-zinc-400 bg-zinc-400/10"
    }
  }

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Code className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">LeetCode Progress</h3>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Stats Overview */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-800/30 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">{leetcodeInfo.totalSolved}</div>
                <div className="text-xs text-zinc-400">Total Solved</div>
              </div>
              <div className="bg-zinc-800/30 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400">{leetcodeInfo.easySolved}</div>
                <div className="text-xs text-zinc-400">Easy</div>
              </div>
              <div className="bg-zinc-800/30 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">{leetcodeInfo.mediumSolved}</div>
                <div className="text-xs text-zinc-400">Medium</div>
              </div>
              <div className="bg-zinc-800/30 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-400">{leetcodeInfo.hardSolved}</div>
                <div className="text-xs text-zinc-400">Hard</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Additional Stats */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center bg-zinc-800/30 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 mr-3 text-cyan-400" />
                <div>
                  <div className="font-medium">Ranking</div>
                  <div className="text-sm text-zinc-400">#{leetcodeInfo.ranking.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center bg-zinc-800/30 p-3 rounded-lg">
                <Target className="w-5 h-5 mr-3 text-green-400" />
                <div>
                  <div className="font-medium">Current Streak</div>
                  <div className="text-sm text-zinc-400">{leetcodeInfo.streak} days</div>
                </div>
              </div>
              <div className="flex items-center bg-zinc-800/30 p-3 rounded-lg">
                <Award className="w-5 h-5 mr-3 text-purple-400" />
                <div>
                  <div className="font-medium">Username</div>
                  <div className="text-sm text-zinc-400">{leetcodeInfo.username}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Activity Heatmap */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-400 flex items-center border-b border-zinc-800 pb-2">
                <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                Recent Activity Heatmap
              </h4>
              <div className="bg-zinc-800/30 p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-xs text-zinc-400 text-center p-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {leetcodeInfo.heatmapData.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.count)} border border-zinc-700/50`}
                      title={`${day.date}: ${day.count} problems solved`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-zinc-800 border border-zinc-700/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-900/50 border border-zinc-700/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-700/70 border border-zinc-700/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-500 border border-zinc-700/50" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Badges */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-zinc-400 flex items-center border-b border-zinc-800 pb-2">
                <Trophy className="w-4 h-4 mr-2 text-cyan-400" />
                Achievements & Badges
              </h4>
              <div className="flex flex-wrap gap-2">
                {leetcodeInfo.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="bg-zinc-800/50 hover:bg-zinc-700 text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Recent Submissions */}
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-400 flex items-center border-b border-zinc-800 pb-2">
                <Code className="w-4 h-4 mr-2 text-cyan-400" />
                Recent Submissions
              </h4>
              <div className="space-y-3">
                {leetcodeInfo.recentSubmissions.map((submission, index) => (
                  <div key={index} className="flex items-center justify-between bg-zinc-800/30 p-3 rounded-lg">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium">{submission.title}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs px-2 py-0.5 ${getDifficultyColor(submission.difficulty)}`}>
                          {submission.difficulty}
                        </Badge>
                        <span className="text-xs text-zinc-400">{submission.language}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-400 font-medium">{submission.status}</div>
                      <div className="text-xs text-zinc-400">{submission.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </CardContent>
    </Card>
  )
}
