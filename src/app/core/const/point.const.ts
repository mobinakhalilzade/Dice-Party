import { IPointTable } from '../interface/point.interface';

export const PointsTable: IPointTable = {
  upperSection: [
    { id: 0, name: 'Ones', multiplier: 1, color: '#e63312' },
    { id: 1, name: 'Twos', multiplier: 2, color: '#ff8f00' },
    { id: 2, name: 'Threes', multiplier: 3, color: '#1387f8' },
    { id: 3, name: 'Fours', multiplier: 4, color: '#7dd80c' },
    { id: 4, name: 'Fives', multiplier: 5, color: '#ad11f4' },
    { id: 5, name: 'Sixes', multiplier: 6, color: '#04d6c2' },
    { id: 6, name: 'Bonus', multiplier: 62, color: '' },
  ],
  lowerSection: [
    { id: 7, name: '3 of a Kind', color: '3X', multiplier: 1 },
    { id: 8, name: '4 of a Kind', color: '4X', multiplier: 1 },
    { id: 9, name: 'Full House', color: 'FH', multiplier: 25 },
    { id: 10, name: 'Sm. Straight', color: 'SM', multiplier: 30 },
    { id: 11, name: 'Lg. Straight', color: 'LG', multiplier: 40 },
    { id: 12, name: '5 of a Kind', color: '5X', multiplier: 50 },
    { id: 13, name: 'Chance', color: 'CH', multiplier: 1 },
  ],
};
