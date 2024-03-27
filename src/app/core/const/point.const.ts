import { IPointTable } from '../interface/point.interface';

export const PointsTable: IPointTable = {
  upperSection: [
    {
      id: 0,
      name: 'Ones',
      multiplier: 1,
      image: '../../../assets/One.png',
      point: null,
      isSelect:false
    },
    {
      id: 1,
      name: 'Twos',
      multiplier: 2,
      image: '../../../assets/Two.png',
      point: null,
      isSelect:false
    },
    {
      id: 2,
      name: 'Threes',
      multiplier: 3,
      image: '../../../assets/Three.png',
      point: null,
      isSelect:false
    },
    {
      id: 3,
      name: 'Fours',
      multiplier: 4,
      image: '../../../assets/Four.png',
      point: null,
      isSelect:false
    },
    {
      id: 4,
      name: 'Fives',
      multiplier: 5,
      image: '../../../assets/Five.png',
      point: null,
      isSelect:false
    },
    {
      id: 5,
      name: 'Sixes',
      multiplier: 6,
      image: '../../../assets/Six.png',
      point: null,
      isSelect:false
    },
    { id: 6, name: 'Bonus', multiplier: 62, image: '', point: null,isSelect:false },
  ],
  lowerSection: [
    {
      id: 7,
      name: '3 of a Kind',
      image: '../../../assets/3X.png',
      multiplier: 1,
      point: null,
      isSelect:false
    },
    {
      id: 8,
      name: '4 of a Kind',
      image: '../../../assets/4X.png',
      multiplier: 1,
      point: null,
      isSelect:false
    },
    {
      id: 9,
      name: 'Full House',
      image: '../../../assets/FH.png',
      multiplier: 25,
      point: null,
      isSelect:false
    },
    {
      id: 10,
      name: 'Sm. Straight',
      image: '../../../assets/SM.png',
      multiplier: 30,
      point: null,
      isSelect:false
    },
    {
      id: 11,
      name: 'Lg. Straight',
      image: '../../../assets/LG.png',
      multiplier: 40,
      point: null,
      isSelect:false
    },
    {
      id: 12,
      name: '5 of a Kind',
      image: '../../../assets/5X.png',
      multiplier: 50,
      point: null,
      isSelect:false
    },
    {
      id: 13,
      name: 'Chance',
      image: '../../../assets/CH.png',
      multiplier: 1,
      point: null,
      isSelect:false
    },
  ],
};
