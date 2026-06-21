import React from 'react';
import { Wordmark } from './components/Icons';

export interface InactiveMessageProps {
  title: string;
  body: string;
}

export const InactiveMessage: React.FC<InactiveMessageProps> = ({ title, body }) => (
  <div className="saiz-inline" role="status">
    <Wordmark />
    <p className="saiz-inline__title">{title}</p>
    <p className="saiz-inline__body">{body}</p>
  </div>
);
