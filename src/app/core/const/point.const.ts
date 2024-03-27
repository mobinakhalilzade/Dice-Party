import { IPointTable } from '../interface/point.interface';

export const PointsTable: IPointTable = {
  upperSection: [
    { id: 0, name: 'Ones', multiplier: 1, color: '#e63312', point: null },
    { id: 1, name: 'Twos', multiplier: 2, color: '#ff8f00', point: null },
    { id: 2, name: 'Threes', multiplier: 3, color: '#1387f8', point: null },
    { id: 3, name: 'Fours', multiplier: 4, color: '#7dd80c', point: null },
    { id: 4, name: 'Fives', multiplier: 5, color: '#ad11f4', point: null },
    { id: 5, name: 'Sixes', multiplier: 6, color: '#04d6c2', point: null },
    { id: 6, name: 'Bonus', multiplier: 62, color: '', point: null },
  ],
  lowerSection: [
    { id: 7, name: '3 of a Kind', color: '3X', multiplier: 1, point: null },
    { id: 8, name: '4 of a Kind', color: '4X', multiplier: 1, point: null },
    { id: 9, name: 'Full House', color: 'FH', multiplier: 25, point: null },
    { id: 10, name: 'Sm. Straight', color: 'SM', multiplier: 30, point: null },
    { id: 11, name: 'Lg. Straight', color: 'LG', multiplier: 40, point: null },
    { id: 12, name: '5 of a Kind', color: '5X', multiplier: 50, point: null },
    { id: 13, name: 'Chance', color: 'CH', multiplier: 1, point: null },
  ],
};
