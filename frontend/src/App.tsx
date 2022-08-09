import React from 'react';
import { BookList } from './BookList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BookList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
