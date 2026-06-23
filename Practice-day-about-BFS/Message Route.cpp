#include<bits/stdc++.h>
using namespace std;

vector<int> adj_list[1000002];
bool vis[1000002];
int level[1000002];
int parent[1000002];

void bfs(int src)
{
    queue<int> q;
    q.push(src);
    vis[src] = true;
    level[src] = 0;

    while(!q.empty())
    {
        int par = q.front();
        q.pop();

        for(int child : adj_list[par])
        {
            if(!vis[child])
            {
                q.push(child);
                vis[child] = true;
                level[child] = level[par] + 1;
                parent[child] = par;
            }
        }
    }
}

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
    memset(vis, false, sizeof(vis));
    memset(level, -1, sizeof(level));
    memset(parent, -1, sizeof(parent));

    int src = 1;
    bfs(src);

    if (!vis[n])
    {
        cout << "IMPOSSIBLE" << endl;
        return 0;
    }

    vector<int> path;
    int node = n;
    while(node != -1)
    {
        path.push_back(node);
        node = parent[node];
    }

    cout << path.size() << endl;
    reverse(path.begin(), path.end());
    for(int i : path)
    {
        cout << i << " ";
    }
    cout << endl;
 
    return 0;
}

