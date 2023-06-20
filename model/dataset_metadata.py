file_name = "regressor.pickle"

dropped_columns = [
    'school', 'G1', 'G2', 'address'
]

target_columns = [
    'G3'
]

non_influential_columns = [
    'sex', 'age', 'famsize', 'reason', 'failures', 'nursery'
]

influential_columns = [
    'Pstatus', 'Medu', 'Fedu', 'Mjob', 'Fjob', 'guardian', 'traveltime', 'studytime',
    'schoolsup', 'famsup', 'paid', 'activities',
    'higher', 'internet', 'romantic', 'famrel', 'freetime', 'goout', 'Dalc',
    'Walc', 'health', 'absences',
]

column_description = {
    'sex': 'płeć',
    'age': 'wiek',
    'famsize': 'rozmiar rodziny',
    'Pstatus': 'status separacji rodziców',
    'Medu': 'edukacja matki',
    'Fedu': 'edukacja ojca',
    'Mjob': 'praca matki',
    'Fjob': 'praca ojca',
    'reason': 'powód wyboru szkoły',
    'guardian': 'opiekun prawny',
    'traveltime': 'czas podróży do szkoły',
    'studytime': 'czas poświęcony na naukę',
    'failures': 'liczba przeszłych niezaliczonych przedmiotów',
    'schoolsup': 'szkolne dodatkowe wsparcie edukacyjne',
    'famsup': 'wsparcie edukacyjne ze strony rodziny',
    'paid': 'dodatkowe płatne zajęcia edukacyjne',
    'activities': 'dodatkowe zajęcia pozaszkolne',
    'nursery': 'uczęszczanie do przedszkola przed szkołą',
    'higher': 'chęć podjęcia wyzszych studiów',
    'internet': 'dostęp do internetu w domu',
    'romantic': 'w związku',
    'famrel': 'jakość relacji z rodziną',
    'freetime': 'ilość wolnego czasu',
    'goout': 'ilość wyjść ze znajomymi',
    'Dalc': 'konsumpcja alkoholu w dni robocze',
    'Walc': 'konsumpcja alkoholu w weekendy',
    'health': 'stan zdrowia',
    'absences': 'liczba nieobecności w szkole'
}
