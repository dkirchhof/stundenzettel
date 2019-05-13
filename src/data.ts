import { IData } from "./models/data";

export const data: IData = {
    "name": "Daniel Kirchhof",
    "year": 2019,
    "minutesPerDay": 480,
    "startWith": {
        "holiday": 12000,
        "timeFromYearBefore": 60
    },
    "months": [
        [
            {
                "date": "2019-01-01",
                "should": 0
            },
            {
                "date": "2019-01-01",
                "should": 480,
                "start": 480,
                "end": 960,
                "break": 30,
                "sick": 30, 
            },
            {
                "date": "2019-01-01",
                "should": 480,
                "holiday": 480
            },
            {
                "date": "2019-01-01",
                "should": 480,
                "start": 480,
                "end": 1060,
                "break": 30
            },
            {
                "date": "2019-01-01",
                "should": 0,
            },
            {
                "date": "2019-01-02",
                "should": 0
            },
            {
                "date": "2019-01-03",
                "should": 480
            },
            {
                "date": "2019-01-04",
                "should": 480
            },
            {
                "date": "2019-01-05",
                "should": 480
            },
            {
                "date": "2019-01-06",
                "should": 480
            },
            {
                "date": "2019-01-07",
                "should": 480
            },
            {
                "date": "2019-01-08",
                "should": 0
            },
            {
                "date": "2019-01-09",
                "should": 0
            },
            {
                "date": "2019-01-10",
                "should": 480
            },
            {
                "date": "2019-01-11",
                "should": 480,
            },
            {
                "date": "2019-01-12",
                "should": 480
            },
            {
                "date": "2019-01-13",
                "should": 480
            },
        ],
        [
            {
                "date": "2019-02-01",
                "should": 480
            }
        ]
    ]
}