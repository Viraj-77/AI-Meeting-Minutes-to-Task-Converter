import { ParsedTask } from '../types/Task';
import * as chrono from 'chrono-node';

export function parseNaturalLanguageTask(input: string): ParsedTask {
  const cleanInput = input.trim();
  
  // Extract assignee (first word followed by comma)
  const assigneeMatch = cleanInput.match(/^(\w+),/);
  const assignee = assigneeMatch ? assigneeMatch[1] : '';
  
  // Remove assignee from input for further parsing
  const inputWithoutAssignee = assigneeMatch 
    ? cleanInput.replace(/^\w+,/, '').trim()
    : cleanInput;

  // Extract priority (P1-P4)
  const priorityMatch = inputWithoutAssignee.match(/\b(P[1-4])\b/i);
  const priority = priorityMatch 
    ? (priorityMatch[1].toUpperCase() as 'P1' | 'P2' | 'P3' | 'P4')
    : 'P3';

  // Remove priority from input
  const inputWithoutPriority = inputWithoutAssignee.replace(/\b(P[1-4])\b/i, '').trim();

  // Extract due date using chrono-node
  const parsedDate = chrono.parseDate(inputWithoutPriority, new Date('2025-06-13'));
  const dueDate = parsedDate ? new Date(parsedDate) : null;

  // Extract task name by removing date-related phrases
  const taskName = extractTaskName(inputWithoutPriority);

  return {
    taskName: taskName || cleanInput,
    assignee,
    dueDate,
    priority
  };
}

function extractTaskName(input: string): string {
  // Remove date-related phrases
  const datePhrases = [
    /\b(?:by|before|on|due|until)\s+.*?(?=\s|$)/i,
    /\b(?:tomorrow|today|next|this)\s+(?:week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i,
    /\b\d{1,2}(?:st|nd|rd|th)?\s+(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i,
    /\b(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2}(?:st|nd|rd|th)?\b/i,
    /\b\d{1,2}\/\d{1,2}\b/,
    /\b(?:at|by)\s+\d{1,2}:?\d{0,2}\s*(?:am|pm)?\b/i,
    /\b(?:in|after)\s+\d+\s+(?:days?|weeks?|months?)\b/i
  ];

  let cleanedInput = input;
  for (const pattern of datePhrases) {
    cleanedInput = cleanedInput.replace(pattern, '').trim();
  }

  // Clean up extra spaces and conjunctions
  cleanedInput = cleanedInput
    .replace(/\s+/g, ' ')
    .replace(/^\s*(?:and|&)\s*/i, '')
    .replace(/\s*(?:and|&)\s*$/i, '')
    .trim();

  return cleanedInput;
}