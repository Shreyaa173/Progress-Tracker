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

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200";
    case "medium":
      return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200";
    case "hard":
      return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
  }
};

const getStatusIcon = (status) => {
  const normalizedStatus = status.trim().toLowerCase();
  switch (normalizedStatus) {
    case "completed":
      return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    case "in progress":
      return <Clock className="w-5 h-5 text-amber-600" />;
    case "marked for revision":
      return <Flag className="w-5 h-5 text-rose-600" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-600" />;
  }
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <Card
    className={`border-l-4 ${color} shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md bg-white`}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
            {trend && (
              <span className="text-xs font-medium text-emerald-600">
                +{trend}%
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-full ${color.replace("border", "bg")}/10`}>
          <Icon className={`w-6 h-6 ${color.replace("border", "text")}`} />
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
    <div className="main">
      <div className="border rounded-lg mb-4 overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-2">
            <span className="text-base sm:text-lg font-medium text-gray-800">
              Day {day}
            </span>
            <div className="flex items-center w-full sm:w-auto gap-2">
              <div className="h-2 w-full sm:w-64  bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">
                {completionRate}%
              </span>
            </div>
          </div>

          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {isExpanded && (
          <div className="border-t">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {problems.map((problem, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {problem.problem}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={`${getDifficultyColor(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(problem.status)}
                        <select
                          value={problem.status}
                          onChange={(e) =>
                            onStatusChange(problem.day, index, e.target.value)
                          }
                          className="ml-2 bg-white border border-gray-300 rounded px-2 py-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </div>
  );
};

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProblems = await fetchProblems();
        setProblems(fetchedProblems);
      } catch (err) {
        setError(err.message || "Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };
    loadProblems();
  }, []);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-rose-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#CEA07E]">
      <div className="p-8 max-w-7xl mx-auto">
        <Card className="mb-8 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800">
                <Code2 className="w-8 h-8 text-blue-600" />
                <span>LeetCode Progress Tracker</span>
              </CardTitle>
              <Badge className="px-4 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                Keep Coding!
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">
          <StatCard
            title="Problems Completed"
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
            title="Marked for Revision"
            value={stats.inReview}
            icon={Eye}
            color="border-rose-500"
          />
          <StatCard
            title="Total Problems"
            value={stats.total}
            icon={Code2}
            color="border-blue-500"
          />
        </div>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search problems..."
                  className="pl-9 max-w-md"
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
