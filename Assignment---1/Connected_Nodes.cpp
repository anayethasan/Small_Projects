// #include <bits/stdc++.h>
// using namespace std;

// vector<int> adj_list[1005];
// bool visited[1005];

// void bfs(int src, vector<int> &res) 
// {
//     queue<int> q;
//     q.push(src);
//     visited[src] = true;

//     while(!q.empty())
//     {
//         int par = q.front();
//         q.pop();

//         for(int child : adj_list[par])
//         {
//             if(!visited[child])
//             {
//                 res.push_back(child);
//                 visited[child] = true;
//             }
//         }
//     }
// }

// int main() 
// {
//     int n, e;
//     cin >> n >> e; 

//     while (e--) 
//     {
//         int a, b;
//         cin >> a >> b;
//         adj_list[a].push_back(b);
//         adj_list[b].push_back(a);  
//     }

//     int q;
//     cin >> q;  
//     while (q--) 
//     {
        
//         memset(visited, false, sizeof(visited));
//         int x;
//         cin >> x; 

//         vector<int> res; 
        
//         bfs(x, res);

//         if (res.empty()) 
//         {
//             cout << -1 << endl;
//         } 
//         else 
//         {
//             sort(res.begin(), res.end(), greater<int>());

//             for (int i : res) 
//             {
//                 cout << i << " ";
//             }
//             cout << endl;
//         }
//     }

//     return 0;
// }



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
