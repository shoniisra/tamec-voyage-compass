
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const data = [
  { 
    id: 1, 
    path: 'dashboard.html', 
    views: 4265, 
    time: '08m:45s', 
    exitRate: 30.6, 
    isHighExitRate: true 
  },
  { 
    id: 2, 
    path: 'chat.html', 
    views: 2584, 
    time: '05m:02s', 
    exitRate: 19.3, 
    isHighExitRate: true 
  },
  { 
    id: 3, 
    path: 'auth-login.html', 
    views: 3369, 
    time: '04m:25s', 
    exitRate: 5.2, 
    isHighExitRate: false 
  },
  { 
    id: 4, 
    path: 'email.html', 
    views: 985, 
    time: '02m:03s', 
    exitRate: 64.2, 
    isHighExitRate: true 
  },
  { 
    id: 5, 
    path: 'social.html', 
    views: 653, 
    time: '15m:56s',
    exitRate: 2.4, 
    isHighExitRate: false 
  },
];

const TopPagesTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ruta de Página</TableHead>
          <TableHead className="text-right">Vistas</TableHead>
          <TableHead className="text-right">Tiempo en Página</TableHead>
          <TableHead className="text-right">Tasa de Salida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.path}</TableCell>
            <TableCell className="text-right">{item.views}</TableCell>
            <TableCell className="text-right">{item.time}</TableCell>
            <TableCell className="text-right">
              <span className={`font-medium ${item.isHighExitRate ? 'text-rose-500' : 'text-emerald-500'}`}>
                {item.exitRate}%
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopPagesTable;
