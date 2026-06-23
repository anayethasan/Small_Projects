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

