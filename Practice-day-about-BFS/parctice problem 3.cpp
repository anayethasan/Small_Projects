#include <bits/stdc++.h>
using namespace std;

vector<int> adj_list[1005];
bool visited[1005];

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
    memset(visited, false, sizeof(visited));
    int src;
    cin >> src;
    cout << adj_list[src].size() << endl;

    return 0;
}
