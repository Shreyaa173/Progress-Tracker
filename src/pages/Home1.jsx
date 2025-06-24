import React, { useState, useEffect, useMemo } from "react";
import topics from "../data/problemData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Input,
} from "../components/Card";
import {
  Calendar,
  CheckCircle,
  Clock,
  Flag,
  AlertCircle,
  Search,
  TrendingUp,
  Award,
  Code2,
  Eye,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const STORAGE_KEY = "dsa-tracker-data";
const DATA_VERSION_KEY = "dsa-tracker-version";
const CURRENT_DATA_VERSION = "1.0";

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-emerald-700/20 text-emerald-500 border-emerald-500 hover:bg-emerald-700/30";
    case "medium":
      return "bg-amber-700/20 text-amber-500 border-amber-500 hover:bg-amber-700/30";
    case "hard":
      return "bg-red-700/20 text-red-500 border-red-500 hover:bg-red-700/30";
    default:
      return "bg-gray-700/20 text-gray-400 border-gray-400 hover:bg-gray-700/30";
  }
};

const getStatusIcon = (status) => {
  const normalizedStatus = status ? status.trim().toLowerCase() : "not started";
  switch (normalizedStatus) {
    case "completed":
      return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
    case "revision":
      return <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
  }
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card
    className={`bg-[#053F3C] border-l-4 ${color} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
  >
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-300">
            {title}
          </p>
          <p className="text-xl sm:text-3xl font-bold mt-1 text-white">
            {value}
          </p>
        </div>
        <div
          className={`p-2 sm:p-3 rounded-full ${color.replace(
            "border",
            "bg"
          )}/10`}
        >
          <Icon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${color.replace(
              "border",
              "text"
            )}`}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProblemRow = ({ problem, onStatusChange }) => (
  <tr className="hover:bg-[#086B65] transition-colors duration-200">
    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
      <a
        href={problem.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-sm font-medium text-gray-200 hover:text-amber-500 transition-colors"
      >
        {problem.problem}
      </a>
    </td>
    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
      <Badge className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
        {problem.difficulty}
      </Badge>
    </td>
    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
      <div className="flex items-center">
        {getStatusIcon(problem.status)}
        <select
          value={problem.status || ""}
          onChange={(e) => onStatusChange(e.target.value)}
          className="ml-2 text-xs sm:text-sm bg-[#086B65] border border-[#042A2B] rounded px-2 py-1 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Not Started</option>
          <option value="completed">Completed</option>
          <option value="revision">Revision</option>
        </select>
      </div>
    </td>
  </tr>
);

const SubtopicSection = ({ subtopic, problems, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completionRate = useMemo(() => {
    const completed = problems.filter((p) => p.status === "completed").length;
    return problems.length > 0
      ? Math.round((completed / problems.length) * 100)
      : 0;
  }, [problems]);

  const stats = useMemo(() => {
    const total = problems.length;
    const completed = problems.filter((p) => p.status === "completed").length;
    const revision = problems.filter((p) => p.status === "revision").length;
    return { total, completed, revision };
  }, [problems]);

  return (
    <div className="border border-[#064E4A] rounded-lg mb-3 overflow-hidden bg-[#064E4A] shadow-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-[#064E4A] flex items-center justify-between hover:bg-[#086B65] transition-colors duration-200"
      >
        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
          <span className="text-sm sm:text-base font-medium text-white whitespace-nowrap">
            {subtopic}
          </span>
          <div className="flex items-center gap-2 flex-1">
            {/* Fixed width progress bar for subtopics */}
            <div className="progress-bar">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">
              {completionRate}%
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 ml-2" />
        ) : (
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 ml-2" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-[#042A2B] overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#086B65]">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#042A2B]">
              {problems.map((problem, index) => (
                <ProblemRow
                  key={index}
                  problem={problem}
                  onStatusChange={(status) => onStatusChange(problem, status)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TopicSection = ({ topicName, subtopics, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const topicStats = useMemo(() => {
    const allProblems = Object.values(subtopics).flat();
    const completed = allProblems.filter(
      (p) => p.status === "completed"
    ).length;
    const total = allProblems.length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      completionRate,
      subtopicsCount: Object.keys(subtopics).length,
    };
  }, [subtopics]);

  return (
    <div className="border border-[#042A2B] rounded-lg mb-6 overflow-hidden bg-[#053F3C] shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-[#053F3C] flex items-center justify-between hover:bg-[#064E4A] transition-colors duration-200"
      >
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
          <span className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">
            {topicName}
          </span>
          <div className="flex items-center gap-3 flex-1">
            {/* Fixed width progress bar for topics - same as subtopics */}
            <div className="h-3 w-32 sm:w-48 md:w-64 lg:w-80 bg-[#042A2B] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                style={{ width: `${topicStats.completionRate}%` }}
              />
            </div>
            <span className="text-sm sm:text-base text-gray-300 whitespace-nowrap font-medium">
              {topicStats.completionRate}%
            </span>
            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              ({topicStats.completed}/{topicStats.total})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-3">
          <Badge className="px-2 py-1 bg-[#042A2B] text-gray-300 text-xs">
            {topicStats.subtopicsCount} subtopics
          </Badge>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          ) : (
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[#042A2B] px-4 sm:px-6 py-4 bg-[#042A2B]">
          {Object.entries(subtopics).map(([subtopic, problems]) => (
            <SubtopicSection
              key={subtopic}
              subtopic={subtopic}
              problems={problems}
              onStatusChange={(problem, status) =>
                onStatusUpdate(topicName, subtopic, problem, status)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Initialize data with localStorage or fallback to topics
  useEffect(() => {
    const initializeData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const savedVersion = localStorage.getItem(DATA_VERSION_KEY);

        if (savedData && savedVersion === CURRENT_DATA_VERSION) {
          // Use saved data if version matches
          setData(JSON.parse(savedData));
        } else {
          // Initialize with fresh data and merge any existing progress
          const freshData = JSON.parse(JSON.stringify(topics));

          if (savedData) {
            try {
              const oldData = JSON.parse(savedData);
              // Merge old progress with new structure
              mergeProgress(freshData, oldData);
            } catch (error) {
              console.warn("Error merging old data:", error);
            }
          }

          setData(freshData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
          localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        setData(JSON.parse(JSON.stringify(topics)));
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Function to merge progress from old data structure
  const mergeProgress = (newData, oldData) => {
    for (const [topicName, subtopics] of Object.entries(newData)) {
      if (oldData[topicName]) {
        for (const [subtopicName, problems] of Object.entries(subtopics)) {
          if (oldData[topicName][subtopicName]) {
            problems.forEach((problem, index) => {
              const oldProblem = oldData[topicName][subtopicName].find(
                (p) => p.problem === problem.problem
              );
              if (oldProblem && oldProblem.status) {
                problem.status = oldProblem.status;
              }
            });
          }
        }
      }
    }
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      const freshData = JSON.parse(JSON.stringify(topics));
      setData(freshData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
      setRefreshing(false);
    }, 1000);
  };

  const handleStatusChange = (topic, subtopic, problem, newStatus) => {
    setData((prev) => {
      const updated = { ...prev };
      const problems = updated[topic][subtopic];
      const index = problems.findIndex((p) => p.problem === problem.problem);
      if (index !== -1) {
        problems[index] = { ...problems[index], status: newStatus };
      }
      return updated;
    });
  };

  const filteredData = data
    ? Object.entries(data).reduce((acc, [topic, subtopics]) => {
        const filteredSubtopics = {};
        for (const [subtopic, problems] of Object.entries(subtopics)) {
          const filtered = problems.filter((p) =>
            p.problem.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filtered.length) {
            filteredSubtopics[subtopic] = filtered;
          }
        }
        if (Object.keys(filteredSubtopics).length > 0) {
          acc[topic] = filteredSubtopics;
        }
        return acc;
      }, {})
    : {};

  const stats = useMemo(() => {
    if (!data)
      return { completed: 0, revision: 0, notStarted: 0, total: 0, topics: 0 };

    const allProblems = Object.values(data).flatMap((subtopics) =>
      Object.values(subtopics).flat()
    );

    return {
      completed: allProblems.filter((p) => p.status === "completed").length,
      revision: allProblems.filter((p) => p.status === "revision").length,
      notStarted: allProblems.filter((p) => !p.status || p.status === "")
        .length,
      total: allProblems.length,
      topics: Object.keys(data).length,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#042A2B] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-100" />
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#042A2B]">
      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-[#053F3C]">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-gray-200">
                <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-200" />
                <span className="text-gray-200">DSA Topic Tracker</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshData}
                  disabled={refreshing}
                  className="px-3 py-1 bg-[#064E4A] hover:bg-[#086B65] text-amber-500 border border-amber-500/20 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                  {refreshing ? "Refreshing..." : "Reset Progress"}
                </button>
                <Badge className="px-3 sm:px-4 py-1 bg-[#042A2B] text-amber-500 hover:bg-[#053F3C]">
                  {stats.topics} topics
                </Badge>
                <Badge className="px-3 sm:px-4 py-1 bg-[#042A2B] text-amber-500 hover:bg-[#053F3C]">
                  Keep Coding!
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={Award}
            color="border-emerald-500"
          />
          <StatCard
            title="For Revision"
            value={stats.revision}
            icon={Eye}
            color="border-red-500"
          />
          <StatCard
            title="Not Started"
            value={stats.notStarted}
            icon={TrendingUp}
            color="border-amber-500"
          />
          <StatCard
            title="Total"
            value={stats.total}
            icon={Code2}
            color="border-amber-500"
          />
        </div>

        <Card className="bg-[#053F3C] border-[#042A2B]">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search problems..."
                  className="pl-9 w-full bg-[#064E4A] border-[#042A2B] text-gray-200 placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search problems"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {Object.entries(filteredData).map(([topic, subtopics]) => (
              <TopicSection
                key={topic}
                topicName={topic}
                subtopics={subtopics}
                onStatusUpdate={handleStatusChange}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
