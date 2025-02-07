import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
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
  Filter,
  TrendingUp,
  Award,
  Code2,
  Eye,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

const fetchProblems = async () => {
  return [
    {
      day: 1,
      date: "2025-02-07",
      problem: "Two Sum",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/two-sum/description/",
    },
    {
      day: 1,
      date: "2025-02-07",
      problem: "Concatenation of Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/concatenation-of-array/description/",
    },
    {
      day: 1,
      date: "2025-02-07",
      problem: "Shuffle the Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/shuffle-the-array/description/",
    },

    // Day 2
    {
      day: 2,
      date: "2025-02-08",
      problem: "Remove Element",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/remove-element",
    },
    {
      day: 2,
      date: "2025-02-08",
      problem: "Majority Element",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/majority-element",
    },
    {
      day: 2,
      date: "2025-02-08",
      problem: "Merge Sorted Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/merge-sorted-array",
    },

    // Day 3
    {
      day: 3,
      date: "2025-02-09",
      problem: "Valid Palindrome",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/valid-palindrome/description/",
    },
    {
      day: 3,
      date: "2025-02-09",
      problem: "Length of Last Word",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/length-of-last-word/description/",
    },
    {
      day: 3,
      date: "2025-02-09",
      problem: "Is Subsequence",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/is-subsequence/description/",
    },

    // Day 4
    {
      day: 4,
      date: "2025-02-10",
      problem: "Binary Search",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/binary-search",
    },
    {
      day: 4,
      date: "2025-02-10",
      problem: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
    },
    {
      day: 4,
      date: "2025-02-10",
      problem: "Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array",
    },

    // Day 5
    {
      day: 5,
      date: "2025-02-11",
      problem: "Search Insert Position",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/search-insert-position",
    },
    {
      day: 5,
      date: "2025-02-11",
      problem: "Squares of a Sorted Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/squares-of-a-sorted-array/description/",
    },
    {
      day: 5,
      date: "2025-02-11",
      problem: "Kth Largest Element in an Array",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    },

    // Day 6
    {
      day: 6,
      date: "2025-02-12",
      problem: "Guess Number Higher or Lower",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/guess-number-higher-or-lower/description/",
    },
    {
      day: 6,
      date: "2025-02-12",
      problem: "Sum of Variable Length Subarrays",
      difficulty: "Hard",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/contest/weekly-contest-433/problems/sum-of-variable-length-subarrays/description/",
    },
    {
      day: 6,
      date: "2025-02-12",
      problem: "Height Checker",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/height-checker/description/",
    },

    // Day 7
    {
      day: 7,
      date: "2025-02-13",
      problem: "Remove Duplicates from Sorted Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
    },
    {
      day: 7,
      date: "2025-02-13",
      problem: "Maximum Product of Three Numbers",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/maximum-product-of-three-numbers/description/",
    },
    {
      day: 7,
      date: "2025-02-13",
      problem: "Third Maximum Number",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/third-maximum-number/",
    },

    // Day 8
    {
      day: 8,
      date: "2025-02-14",
      problem: "Intersection of Two Arrays II",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/intersection-of-two-arrays-ii/description/",
    },
    {
      day: 8,
      date: "2025-02-14",
      problem: "Contains Duplicate",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/contains-duplicate/",
    },
    {
      day: 8,
      date: "2025-02-14",
      problem: "Merge Intervals",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/merge-intervals",
    },

    // Day 9
    {
      day: 9,
      date: "2025-02-15",
      problem: "Relative Sort Array",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/relative-sort-array/description/",
    },
    {
      day: 9,
      date: "2025-02-15",
      problem: "Missing Number",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/missing-number/",
    },
    {
      day: 9,
      date: "2025-02-15",
      problem: "Single Number",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/single-number/",
    },

    // Day 10
    {
      day: 10,
      date: "2025-02-16",
      problem: "Find All Numbers Disappeared in an Array",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array",
    },
    {
      day: 10,
      date: "2025-02-16",
      problem: "Two Sum II - Input Array Is Sorted",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted",
    },
    {
      day: 10,
      date: "2025-02-16",
      problem: "Intersection of Two Arrays",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/intersection-of-two-arrays",
    },

    // Day 11
    {
      day: 11,
      date: "2025-02-17",
      problem: "Find the Duplicate Number",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/find-the-duplicate-number",
    },
    {
      day: 11,
      date: "2025-02-17",
      problem: "Reverse Linked List",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/reverse-linked-list",
    },
    {
      day: 11,
      date: "2025-02-17",
      problem: "Move Zeroes",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/move-zeroes",
    },

    // Day 12
    {
      day: 12,
      date: "2025-02-18",
      problem: "Remove Nth Node From End of List",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list",
    },
    {
      day: 12,
      date: "2025-02-18",
      problem: "Swap Nodes in Pairs",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/swap-nodes-in-pairs",
    },
    {
      day: 12,
      date: "2025-02-18",
      problem: "Reverse Linked List",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/reverse-linked-list",
    },

    // Day 13
    {
      day: 13,
      date: "2025-02-19",
      problem: "Merge Two Sorted Lists",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/merge-two-sorted-lists",
    },
    {
      day: 13,
      date: "2025-02-19",
      problem: "Remove Linked List Elements",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/remove-linked-list-elements",
    },
    {
      day: 13,
      date: "2025-02-19",
      problem: "Linked List Cycle",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/linked-list-cycle",
    },

    // Day 14
    {
      day: 14,
      date: "2025-02-20",
      problem: "Palindrome Linked List",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/palindrome-linked-list",
    },
    {
      day: 14,
      date: "2025-02-20",
      problem: "Delete Node in a Linked List",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/delete-node-in-a-linked-list",
    },
    {
      day: 14,
      date: "2025-02-20",
      problem: "Middle of the Linked List",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/middle-of-the-linked-list",
    },

    // Day 15
    {
      day: 15,
      date: "2025-02-21",
      problem: "Intersection of Two Linked Lists",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/intersection-of-two-linked-lists",
    },
    {
      day: 15,
      date: "2025-02-21",
      problem: "Power of Two",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/power-of-two",
    },
    {
      day: 15,
      date: "2025-02-21",
      problem: "Reverse String",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/reverse-string",
    },

    // Day 16
    {
      day: 16,
      date: "2025-02-22",
      problem: "Happy Number",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/happy-number",
    },
    {
      day: 16,
      date: "2025-02-22",
      problem: "Valid Parentheses",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/valid-parentheses",
    },
    {
      day: 16,
      date: "2025-02-22",
      problem: "Next Greater Element I",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/next-greater-element-i",
    },

    // Day 17
    {
      day: 17,
      date: "2025-02-23",
      problem: "Daily Temperatures",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/daily-temperatures",
    },
    {
      day: 17,
      date: "2025-02-23",
      problem: "Implement Queue using Stacks",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/implement-queue-using-stacks",
    },
    {
      day: 17,
      date: "2025-02-23",
      problem: "Evaluate Reverse Polish Notation",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/evaluate-reverse-polish-notation",
    },

    // Day 18
    {
      day: 18,
      date: "2025-02-24",
      problem: "Min Stack",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/min-stack",
    },
    {
      day: 18,
      date: "2025-02-24",
      problem: "Asteroid Collision",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/asteroid-collision",
    },
    {
      day: 18,
      date: "2025-02-24",
      problem: "Next Greater Element II",
      difficulty: "Medium",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/next-greater-element-ii",
    },

    // Day 19
    {
      day: 19,
      date: "2025-02-25",
      problem: "Trapping Rain Water",
      difficulty: "Hard",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/trapping-rain-water",
    },
    {
      day: 19,
      date: "2025-02-25",
      problem: "Same Tree",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/same-tree",
    },
    {
      day: 19,
      date: "2025-02-25",
      problem: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/binary-tree-inorder-traversal",
    },

    // Day 20
    {
      day: 20,
      date: "2025-02-26",
      problem: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/maximum-depth-of-binary-tree",
    },
    {
      day: 20,
      date: "2025-02-26",
      problem: "Balanced Binary Tree",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/balanced-binary-tree",
    },
    {
      day: 20,
      date: "2025-02-26",
      problem: "Symmetric Tree",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/symmetric-tree",
    },

    // Day 21
    {
      day: 21,
      date: "2025-02-27",
      problem: "Path Sum",
      difficulty: "Easy",
      status: "Not Started",
      timeSpent: 0,
      notes: "",
      link: "https://leetcode.com/problems/path-sum",
    },
  ];
};

const STORAGE_KEY = "leetcode-tracker-data";

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
  const normalizedStatus = status.trim().toLowerCase();
  switch (normalizedStatus) {
    case "completed":
      return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
    case "in progress":
      return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
    case "marked for revision":
      return <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
  }
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <Card
    className={`bg-[#053F3C] border-l-4 ${color} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
  >
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-300">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-3xl font-bold mt-1 text-white">
              {value}
            </p>
            {trend && (
              <span className="text-xs font-medium text-emerald-500">
                +{trend}%
              </span>
            )}
          </div>
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

const DaySection = ({ day, problems, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completionRate = useMemo(() => {
    const completed = problems.filter((p) => p.status === "completed").length;
    return Math.round((completed / problems.length) * 100);
  }, [problems]);

  return (
    <div className="border border-[#042A2B] rounded-lg mb-4 overflow-hidden bg-[#053F3C] shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-[#053F3C] flex items-center justify-between hover:bg-[#064E4A] transition-colors duration-200"
      >
        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <span className="text-base sm:text-lg font-medium text-white whitespace-nowrap">
            Day {day}
          </span>
          <div className="flex items-center gap-2 flex-1">
            <div className="h-2 w-16 sm:w-32 md:w-48 lg:w-64 xl:w-250 bg-[#042A2B] rounded-full overflow-hidden">
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
            <thead className="bg-[#064E4A]">
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
                <tr
                  key={index}
                  className="hover:bg-[#064E4A] transition-colors duration-200"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-gray-200 hover:text-amber-500 transition-colors"
                    >
                      {problem.problem}
                    </a>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <Badge
                      className={`text-xs ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(problem.status)}
                      <select
                        value={problem.status}
                        onChange={(e) =>
                          onStatusChange(problem.day, index, e.target.value)
                        }
                        className="ml-2 text-xs sm:text-sm bg-[#064E4A] border border-[#042A2B] rounded px-2 py-1 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="not started">Not Started</option>
                        <option value="completed">Completed</option>
                        <option value="in progress">In Progress</option>
                        <option value="marked for revision">
                          Marked for Revision
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get data from localStorage first
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setProblems(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        // If no saved data, fetch from API
        const fetchedProblems = await fetchProblems();
        setProblems(fetchedProblems);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedProblems));
      } catch (err) {
        setError(err.message || "Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to localStorage whenever problems change
  useEffect(() => {
    if (!loading && problems.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
    }
  }, [problems, loading]);

  const handleStatusChange = (day, index, newStatus) => {
    setProblems(
      problems.map((problem) => {
        if (problem.day === day && problems.indexOf(problem) === index) {
          return { ...problem, status: newStatus };
        }
        return problem;
      })
    );
  };

  const filteredProblems = useMemo(
    () =>
      problems.filter((problem) => {
        const matchesSearch = problem.problem
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesDifficulty =
          filterDifficulty === "all" ||
          problem.difficulty.toLowerCase() === filterDifficulty;
        return matchesSearch && matchesDifficulty;
      }),
    [problems, searchTerm, filterDifficulty]
  );

  const problemsByDay = useMemo(() => {
    const grouped = {};
    filteredProblems.forEach((problem) => {
      if (!grouped[problem.day]) {
        grouped[problem.day] = [];
      }
      grouped[problem.day].push(problem);
    });
    return grouped;
  }, [filteredProblems]);

  const stats = useMemo(
    () => ({
      completed: problems.filter((p) => p.status === "completed").length,
      inProgress: problems.filter((p) => p.status === "in progress").length,
      inReview: problems.filter((p) => p.status === "marked for revision")
        .length,
      total: problems.length,
    }),
    [problems]
  );

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

  if (error) {
    return (
      <div className="min-h-screen bg-[#042A2B] flex items-center justify-center text-red-500">
        Error: {error}
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
                <span className="text-gray-200">LeetCode Progress</span>
              </CardTitle>
              <Badge className="px-3 sm:px-4 py-1 bg-[#042A2B] text-amber-500 hover:bg-[#053F3C]">
                Keep Coding!
              </Badge>
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
            title="In Progress"
            value={stats.inProgress}
            icon={TrendingUp}
            color="border-amber-500"
          />
          <StatCard
            title="For Revision"
            value={stats.inReview}
            icon={Eye}
            color="border-red-500"
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
            {Object.entries(problemsByDay)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([day, dayProblems]) => (
                <DaySection
                  key={day}
                  day={day}
                  problems={dayProblems}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
