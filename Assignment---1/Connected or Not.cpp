// #include <bits/stdc++.h>
// using namespace std;

// vector<int> adj_list[1005];

// bool bfs(int src, int dest) 
// {
//     queue<int> q;
//     q.push(src);

//     while (!q.empty())
//     {
//         int par = q.front();
//         q.pop();

//         for (int child : adj_list[par]) 
//         {
//             if (child == dest) 
//             {
//                 return true; 
//             }
//         }
//     }
//     return false; 
// }

// int main()
// {
//     int n, e;
//     cin >> n >> e;

//     for (int i = 0; i < e; i++) 
//     {
//         int a, b;
//         cin >> a >> b;
//         adj_list[a].push_back(b); 
//     }

//     int q;
//     cin >> q;
//     while (q--) 
//     {
//         int src, dest;
//         cin >> src >> dest;

//         if (bfs(src, dest) || src == dest) 
//             cout << "YES" << endl;
//         else 
//             cout << "NO" << endl;
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

