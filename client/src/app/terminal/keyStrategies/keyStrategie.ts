import { Terminal } from '../terminal';

export abstract class KeyStrategy {
  abstract execute(terminal: Terminal, e: KeyboardEvent): void;
}