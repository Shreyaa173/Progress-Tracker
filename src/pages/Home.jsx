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
  Star,
  Filter,
  X,
} from "lucide-react";

const STORAGE_KEY = "dsa-tracker-data";
const DATA_VERSION_KEY = "dsa-tracker-version";
const CURRENT_DATA_VERSION = "1.0";

// Helper functions
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

const FilterDropdown = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { key: "starred", label: "Starred Questions", type: "checkbox" },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "completed", label: "Completed" },
        { value: "revision", label: "Revision" },
        { value: "not_started", label: "Not Started" },
      ],
    },
    {
      key: "difficulty",
      label: "Difficulty",
      type: "select",
      options: [
        { value: "", label: "All Difficulties" },
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
      ],
    },
  ];

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v && v !== ""
  ).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#064E4A] border border-[#042A2B] rounded-md text-gray-200 hover:bg-[#086B65] transition-colors duration-200"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filters</span>
        {activeFiltersCount > 0 && (
          <Badge className="bg-amber-500 text-black text-xs px-1 py-0 min-w-[16px] h-4 flex items-center justify-center">
            {activeFiltersCount}
          </Badge>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#053F3C] border border-[#042A2B] rounded-md shadow-lg z-10">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-200">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {filterOptions.map((option) => (
              <div key={option.key} className="space-y-2">
                <label className="text-xs font-medium text-gray-300">
                  {option.label}
                </label>
                {option.type === "checkbox" ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters[option.key] || false}
                      onChange={(e) =>
                        onFilterChange(option.key, e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-600 bg-[#064E4A] text-amber-500 focus:ring-amber-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">
                      Show starred only
                    </span>
                  </label>
                ) : (
                  <select
                    value={filters[option.key] || ""}
                    onChange={(e) => onFilterChange(option.key, e.target.value)}
                    className="w-full px-3 py-2 bg-[#064E4A] border border-[#042A2B] rounded text-gray-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {option.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-[#042A2B]">
              <button
                onClick={onClearFilters}
                className="w-full px-3 py-2 bg-[#042A2B] text-gray-300 rounded text-sm hover:bg-[#064E4A] transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemRow = ({
  problem,
  topicName,
  subtopic,
  onStatusChange,
  onStarToggle,
}) => (
  <tr className="hover:bg-[#086B65] transition-colors duration-200">
    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onStarToggle(topicName, subtopic, problem)}
          className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
          title={problem.starred ? "Unstar problem" : "Star problem"}
        >
          <Star
            className={`w-4 h-4 ${
              problem.starred
                ? "fill-amber-500 text-amber-500"
                : "text-gray-400"
            }`}
          />
        </button>
        <a
          href={problem.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-medium text-gray-200 hover:text-amber-500 transition-colors"
        >
          {problem.problem}
        </a>
      </div>
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
          value={(problem?.status || "").toLowerCase()}
          onChange={(e) =>
            onStatusChange(topicName, subtopic, problem, e.target.value)
          }
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

const SubtopicSection = ({
  topicName,
  subtopic,
  problems,
  onStatusChange,
  onStarToggle,
}) => {
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
    const starred = problems.filter((p) => p.starred).length;
    return { total, completed, revision, starred };
  }, [problems]);

  return (
    <div className="border border-[#064E4A] rounded-lg mb-3 overflow-hidden bg-[#064E4A] shadow-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-[#064E4A] flex items-center justify-between hover:bg-[#086B65] transition-colors duration-200"
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
          <span className="text-xs sm:text-sm md:text-base font-medium text-white truncate">
            {subtopic}
          </span>
          {stats.starred > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-xs text-amber-500">{stats.starred}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-32 sm:w-48 md:w-56 lg:w-60 xl:w-64 justify-end">
          <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40 bg-[#042A2B] rounded-full h-1.5 sm:h-2 md:h-2 overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{
                width: `${completionRate}%`,
                minWidth: completionRate > 0 ? "2px" : "0",
              }}
            />
          </div>
          <span className="text-xs sm:text-sm text-gray-300 w-8 sm:w-10 text-right">
            {completionRate}%
          </span>
        </div>

        {isExpanded ? (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 ml-2 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 ml-2 flex-shrink-0" />
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
                  topicName={topicName}
                  subtopic={subtopic}
                  onStatusChange={onStatusChange}
                  onStarToggle={onStarToggle}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TopicSection = ({
  topicName,
  subtopics,
  onStatusChange,
  onStarToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const topicStats = useMemo(() => {
    const allProblems = Object.values(subtopics).flat();
    const completed = allProblems.filter(
      (p) => p.status === "completed"
    ).length;
    const starred = allProblems.filter((p) => p.starred).length;
    const total = allProblems.length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      completionRate,
      starred,
      subtopicsCount: Object.keys(subtopics).length,
    };
  }, [subtopics]);

  return (
    <div className="border border-[#042A2B] rounded-lg mb-6 overflow-hidden bg-[#053F3C] shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-[#053F3C] flex items-center justify-between hover:bg-[#064E4A] transition-colors duration-200"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
          <span className="text-sm sm:text-base md:text-lg font-semibold text-white truncate max-w-full">
            {topicName}
          </span>
          {topicStats.starred > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm text-amber-500">
                {topicStats.starred}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 justify-end">
          <div className="w-24 sm:w-32 md:w-36 lg:w-44 xl:w-48 2xl:w-56 bg-[#042A2B] rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
              style={{
                width: `${topicStats.completionRate}%`,
                minWidth: topicStats.completionRate > 0 ? "3px" : "0",
              }}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium w-8 sm:w-10 text-right">
              {topicStats.completionRate}%
            </span>
            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              ({topicStats.completed}/{topicStats.total})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <Badge className="px-2 py-1 bg-[#042A2B] text-gray-300 text-xs whitespace-nowrap">
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
          {Object.entries(subtopics).map(([subtopicName, problems]) => (
            <SubtopicSection
              key={subtopicName}
              topicName={topicName}
              subtopic={subtopicName}
              problems={problems}
              onStatusChange={onStatusChange}
              onStarToggle={onStarToggle}
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
  const [filters, setFilters] = useState({
    starred: false,
    status: "",
    difficulty: "",
  });

  // Initialize data with localStorage or fallback to topics
  useEffect(() => {
    const initializeData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const savedVersion = localStorage.getItem(DATA_VERSION_KEY);

        if (savedData && savedVersion === CURRENT_DATA_VERSION) {
          setData(JSON.parse(savedData));
        } else {
          const freshData = JSON.parse(JSON.stringify(topics));

          if (savedData) {
            try {
              const oldData = JSON.parse(savedData);
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
              if (oldProblem) {
                if (oldProblem.status) {
                  problem.status = oldProblem.status;
                }
                if (oldProblem.starred) {
                  problem.starred = oldProblem.starred;
                }
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
      if (!prev[topic] || !prev[topic][subtopic]) {
        console.warn("Topic or subtopic not found:", topic, subtopic);
        return prev;
      }

      const problems = prev[topic][subtopic];
      const index = problems.findIndex((p) => p.problem === problem.problem);

      if (index === -1) {
        console.warn("Problem not found:", problem.problem);
        return prev;
      }

      const updatedProblems = prev[topic][subtopic].map((p, i) =>
        i === index
          ? {
              ...p,
              status:
                typeof newStatus === "string" ? newStatus.toLowerCase() : "",
            }
          : p
      );

      console.log("Updating status for", problem.problem, "to", newStatus); // ✅ Debug
      return {
        ...prev,
        [topic]: {
          ...prev[topic],
          [subtopic]: updatedProblems,
        },
      };
    });
  };

  // Debug version of handleStarToggle to identify the issue
  const handleStarToggle = (topic, subtopic, problem) => {
    setData((prev) => {
      if (!prev[topic] || !prev[topic][subtopic]) {
        console.warn("Topic or subtopic not found:", topic, subtopic);
        return prev;
      }

      const problems = prev[topic][subtopic];
      const index = problems.findIndex((p) => p.problem === problem.problem);

      if (index === -1) {
        console.warn("Problem not found:", problem.problem);
        return prev;
      }

      // Create deep copy with proper immutability
      return {
        ...prev,
        [topic]: {
          ...prev[topic],
          [subtopic]: prev[topic][subtopic].map((p, i) =>
            i === index ? { ...p, starred: !p.starred } : p
          ),
        },
      };
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      starred: false,
      status: "",
      difficulty: "",
    });
  };

  const filteredData = data
    ? Object.entries(data).reduce((acc, [topic, subtopics]) => {
        const filteredSubtopics = {};
        for (const [subtopic, problems] of Object.entries(subtopics)) {
          let filtered = problems.filter((p) =>
            p.problem.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Apply filters
          if (filters.starred) {
            filtered = filtered.filter((p) => p.starred);
          }

          if (filters.status) {
            if (filters.status === "") {
              filtered = filtered.filter((p) => !p.status || p.status === "");
            } else {
              filtered = filtered.filter((p) => p.status === filters.status);
            }
          }

          if (filters.difficulty) {
            filtered = filtered.filter(
              (p) => p.difficulty.toLowerCase() === filters.difficulty
            );
          }

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
      return {
        completed: 0,
        revision: 0,
        notStarted: 0,
        total: 0,
        topics: 0,
        starred: 0,
      };

    const allProblems = Object.values(data).flatMap((subtopics) =>
      Object.values(subtopics).flat()
    );

    return {
      completed: allProblems.filter((p) => p.status === "completed").length,
      revision: allProblems.filter((p) => p.status === "revision").length,
      notStarted: allProblems.filter((p) => !p.status || p.status === "")
        .length,
      starred: allProblems.filter((p) => p.starred).length,
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
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-[#053F3C]">
          <CardHeader>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-gray-200">
                <span className="text-gray-200 flex items-center gap-2 sm:gap-3">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-200" />
                  DSA Topic Tracker
                </span>
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <button
                  onClick={refreshData}
                  disabled={refreshing}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#064E4A] hover:bg-[#086B65] text-amber-500 border border-amber-500/20 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <RefreshCw
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      refreshing ? "animate-spin" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {refreshing ? "Refreshing..." : "Reset Progress"}
                  </span>
                  <span className="sm:hidden">
                    {refreshing ? "..." : "Reset"}
                  </span>
                </button>
                <Badge className="px-2 sm:px-3 md:px-4 py-1 bg-[#042A2B] text-amber-500 hover:bg-[#053F3C] text-xs sm:text-sm">
                  {stats.topics} topics
                </Badge>
                <Badge className="px-2 sm:px-3 md:px-4 py-1 bg-[#042A2B] text-amber-500 hover:bg-[#053F3C] text-xs sm:text-sm">
                  Keep Coding!
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
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
            color="border-blue-500"
          />
          <StatCard
            title="Starred"
            value={stats.starred}
            icon={Star}
            color="border-green-500"
          />
        </div>

        <Card className="bg-[#053F3C] border-[#042A2B]">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
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

              {/* Filters */}
              <FilterDropdown
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </CardHeader>

          <CardContent>
            {data &&
              Object.entries(filteredData).map(([topic, subtopics]) => (
                <TopicSection
                  key={topic}
                  topicName={topic}
                  subtopics={subtopics}
                  onStatusChange={(
                    topicName,
                    subtopicName,
                    problem,
                    newStatus
                  ) =>
                    handleStatusChange(
                      topicName,
                      subtopicName,
                      problem,
                      newStatus
                    )
                  }
                  onStarToggle={(topicName, subtopicName, problem) =>
                    handleStarToggle(topicName, subtopicName, problem)
                  }
                />
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
