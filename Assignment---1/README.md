# Assignment---1
Summary:
In today's problem-solving session, I worked on various graph-related problems, focusing on adjacency lists, depth-first search (DFS), and direct connectivity checks. The problems covered directed and undirected graphs, matrix traversal, and connected component analysis.

Problems and Approaches:

Connected or Not (Directed Graph)

Approach:

Construct an adjacency list for the directed graph.

Process queries to check if there exists a direct edge from node u to v.
#include <bits/stdc++.h>
using namespace std;

vector<int> adj_list[1005]; 

int main() 
{
    int n, e;
    cin >> n >> e;

    for (int i = 0; i < e; i++) 
    {
        int a, b;
        cin >> a >> b;
        adj_list[a].push_back(b);  
    }

    int q;
    cin >> q;
    while (q--) 
    {
        int src, disti;
        cin >> src >> disti;

        int flag = 0;
        for (int child : adj_list[src]) 
        {
            if (child == disti)
            {
                flag = 1;
                break;
            }
        }

        if (flag || src == disti) 
            cout << "YES" << endl;
        else 
            cout << "NO" << endl;
    }

    return 0;
}



Algorithm:

Read n (nodes) and e (edges).

Store directed edges in an adjacency list.

Process queries and check adjacency list for direct connectivity.

Connected Nodes (Undirected Graph)
#include <bits/stdc++.h>
using namespace std;

vector<int> adj_list[1005]; 

int main() 
{
    int n, e;
    cin >> n >> e;  

    while (e--) 
    {
        int a, b;
        cin >> a >> b;
        adj_list[a].push_back(b);
        adj_list[b].push_back(a);  
    }

    int q;
    cin >> q; 

    while (q--) 
    {
        int src;
        cin >> src;  

        if (adj_list[src].empty()) 
        {
            cout << -1 << endl; 
        } 
        else 
        {
            sort(adj_list[src].begin(), adj_list[src].end(), greater<int>()); 
            for (int child : adj_list[src]) 
            {
                cout << child << " ";
            }
            cout << endl;
        }
    }

    return 0;
}


Approach:

Construct an adjacency list for the undirected graph.

For each query, return the connected nodes in descending order.

Algorithm:

Read n (nodes) and e (edges).

Store edges bidirectionally in an adjacency list.

Sort and return connected nodes for each query.

Can Go? (Matrix Pathfinding)
#include <bits/stdc++.h>
using namespace std;

char graph[1005][1005]; 
bool vis[1005][1005];  
vector<pair<int, int>> dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

int n, m;
int si, sj, di, dj;  

bool valid(int x, int y) 
{
    if ((x < 0 || x >= n) || (y < 0 || y >= m))
        return false;
    else
        return true;    
}

void dfs(int sr, int sc) 
{
    vis[sr][sc] = true;
    
    for (int i = 0; i < 4; i++) 
    {  
        int child_l = sr + dir[i].first;
        int child_r = sc + dir[i].second;

        if (valid(child_l, child_r) && !vis[child_l][child_r] && graph[child_l][child_r] != '#') 
        {
            dfs(child_l, child_r);
        }
    }
}

int main() 
{
    cin >> n >> m;
    
    for (int i = 0; i < n; i++) 
    {
        for (int j = 0; j < m; j++) 
        {
            cin >> graph[i][j];
        }
    }

    memset(vis, false, sizeof(vis));
    for (int i = 0; i < n; i++) 
    {
        for (int j = 0; j < m; j++) 
        {
            if (graph[i][j] == 'A') 
            {
                si = i;
                sj = j;
            }
            if (graph[i][j] == 'B') 
            {
                di = i;
                dj = j;
            }
        }
    }
    
    dfs(si, sj);

    if (vis[di][dj])
        cout << "YES" << endl;
    else
        cout << "NO" << endl;

    return 0;
}


Approach:

Use DFS to explore if room A can reach room B by traversing floors (.).

Algorithm:

Read the matrix dimensions and store the grid.

Identify the coordinates of A and B.

Use DFS to check reachability.

Output "YES" if reachable, else "NO".

Count Apartments (Connected Components in Matrix)
#include<bits/stdc++.h>
using namespace std;

char graph[1005][1005];
bool vis[1005][1005];
vector<pair<int, int>> dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

int n, m;
bool valid(int x, int y)
{
    if(x < 0 || x >= n || y < 0 || y >= m)
        return false;
    else
        return true;
}

int dfs(int sr, int sc)
{
    int cnt = 1;
    vis[sr][sc] = true;
    for(int i = 0; i < 4; i++)
    {
        int child_r = sr + dir[i].first;
        int child_c = sc + dir[i].second;
        if(valid(child_r, child_r) && !vis[child_r][child_c] && graph[child_r][child_c] == '.')
        {
            cnt += dfs(child_r, child_c);
        }
    }
    return cnt;
}

int main()
{
    cin >> n >> m;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cin >> graph[i][j];
        }
        
    }
    memset(vis, false, sizeof(vis));
    
    vector<int> v;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if(graph[i][j] == '.' && !vis[i][j])
            {
                int cnt = dfs(i, j);
                v.push_back(cnt);
            }
        }
        
    }

    if(v.empty())
    {
        cout << 0 << endl;
    }

    sort(v.begin(), v.end());
    for(int x : v)
    {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}



Approach:

Use DFS to count distinct connected components in the grid.

Algorithm:

Read matrix dimensions and store the grid.

Iterate over all cells, and for each unvisited room (.), perform DFS.

Count distinct DFS calls, which represent apartments.

Count Apartments II (Component Size Calculation)
#include<bits/stdc++.h>
using namespace std;

char graph[1005][1005];
bool vis[1005][1005];
vector<pair<int, int>> dir = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

int n, m;
bool valid(int x, int y)
{
    if(x < 0 || x >= n || y < 0 || y >= m)
        return false;
    else
        return true;
}

int dfs(int sr, int sc)
{
    int cnt = 1;
    vis[sr][sc] = true;
    for(int i = 0; i < 4; i++)
    {
        int child_r = sr + dir[i].first;
        int child_c = sc + dir[i].second;
        if(valid(child_r, child_r) && !vis[child_r][child_c] && graph[child_r][child_c] == '.')
        {
            cnt += dfs(child_r, child_c);
        }
    }
    return cnt;
}

int main()
{
    cin >> n >> m;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cin >> graph[i][j];
        }
        
    }
    memset(vis, false, sizeof(vis));
    
    vector<int> v;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if(graph[i][j] == '.' && !vis[i][j])
            {
                int cnt = dfs(i, j);
                v.push_back(cnt);
            }
        }
        
    }

    if(v.empty())
    {
        cout << 0 << endl;
    }

    sort(v.begin(), v.end());
    for(int x : v)
    {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}



Approach:

Use DFS to count the number of rooms in each connected apartment.

Algorithm:

Read matrix dimensions and store the grid.

Iterate over all cells, performing DFS to count connected rooms.

Store and sort component sizes before outputting.

These problems helped reinforce my understanding of adjacency lists, DFS traversal, and matrix-based graph problems. Excited to continue improving in graph theory!

