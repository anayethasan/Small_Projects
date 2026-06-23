# Practice-day---2
Daily Programming Progress - Graph and DFS Problems
Today, I solved multiple problems related to graph traversal using Depth-First Search (DFS). Below is my approach and algorithm for each problem.

1/ Flood Fill Algorithm
Problem Statement:
Given a 2D grid representing an image, change all connected pixels of a starting pixel to a new color.

Approach:
Start DFS from the given pixel.
Change all connected pixels of the same color to the new color.
Ensure boundary conditions to avoid accessing invalid indices.
Use recursion to explore up, down, left, and right pixels.
Algorithm:
If the starting pixel is already the target color, return.
Store the original color of the starting pixel.
Use DFS to traverse adjacent pixels:
Change the color of the current pixel.
Recursively visit the four adjacent pixels (up, down, left, right).
Continue the process until all connected pixels are modified.
2/ Counting Closed Islands
Problem Statement:
Find the number of islands (connected land areas of 0s) that are completely surrounded by water (1s).

Approach:
Use DFS to explore all land cells (0s).
Mark visited cells to avoid reprocessing.
If an island touches the boundary, it is not counted.
Algorithm:
Iterate through the grid, searching for unvisited land cells (0s).
If a land cell is found, perform DFS to explore its connected land.
If any part of the island touches the boundary, mark it as not closed.
Increase the closed island count if DFS confirms it is fully surrounded by water.
3/ Number of Reachable Nodes from a Given Node
Problem Statement:
Find how many nodes can be visited from a given starting node in an undirected graph.

Approach:
Represent the graph using an adjacency list.
Use DFS to traverse all connected nodes.
Keep track of visited nodes to avoid cycles.
Algorithm:
Build an adjacency list from the input edges.
Initialize a visited array to mark explored nodes.
Start DFS from the given node:
Explore all connected nodes recursively.
Count the number of nodes visited.
Return the count.
4/ Counting Components in an Undirected Graph
Problem Statement:
Find the number of connected components in an undirected graph.

Approach:
Use DFS to explore all nodes in a component.
If a node is unvisited, start a new DFS traversal.
Count the number of DFS calls to determine the number of components.
Algorithm:
Construct the adjacency list from edges.
Initialize a visited array for tracking explored nodes.
Iterate over all nodes:
If a node is unvisited, start a DFS traversal.
Increment the component count for each DFS call.
Return the total number of components.
5/ Finding Number of Nodes in Each Component
Problem Statement:
Find the size of each connected component in an undirected graph.

Approach:
Use DFS to explore each component.
Count the number of nodes in each component.
Store and sort the component sizes.
Algorithm:
Build an adjacency list from edges.
Use a visited array to track explored nodes.
Iterate over all nodes:
If unvisited, start DFS and count the number of nodes in that component.
Store the count in a list.
Sort the list in ascending order and return.
Key Takeaways
. DFS is effective for solving graph traversal problems.
. Adjacency lists provide efficient graph representation.
. Visited arrays help avoid redundant computations.
. Component counting and sorting reveal structural insights in graphs.

This session strengthened my understanding of graph traversal using DFS. 🚀

