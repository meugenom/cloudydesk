import { Terminal } from '../terminal';

export interface KeyStrategy {
  execute(terminal: Terminal, e: KeyboardEvent): void;
}