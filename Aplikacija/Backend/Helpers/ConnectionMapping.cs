using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers
{
    public class ConnectionMapping<T> where T : notnull
    {
        private readonly Dictionary<T, HashSet<string>> connections =
            new Dictionary<T, HashSet<string>>();

        public int Count
        {
            get
            {
                return connections.Count;
            }
        }

        public void Add(T key, string connectionId)
        {
            lock (connections)
            {
                HashSet<string>? conn;
                if (!connections.TryGetValue(key, out conn))
                {
                    conn = new HashSet<string>();
                    connections.Add(key, conn);
                }

                lock (conn)
                {
                    conn.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string>? conn;
            if (connections.TryGetValue(key, out conn))
            {
                return conn;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(T key, string connectionId)
        {
            lock (connections)
            {
                HashSet<string>? conn;
                if (!connections.TryGetValue(key, out conn))
                {
                    return;
                }

                lock (conn)
                {
                    conn.Remove(connectionId);

                    if (conn.Count == 0)
                    {
                        connections.Remove(key);
                    }
                }
            }
        }
    }
}
