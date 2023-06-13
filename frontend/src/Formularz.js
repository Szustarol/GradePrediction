import React, { useState } from 'react';

const Formularz = () => {
  const [formData, setFormData] = useState({
    sex: 'sex',
    age: '',
    famsize: '',
    Pstatus: '',
    Medu: '',
    Fedu: '',
    Mjob: '',
    Fjob: '',
    reason: '',
    guardian: '',
    traveltime: '',
    studytime: '',
    failures: '',
    schoolsup: '',
    famsup: '',
    paid: '',
    activities: '',
    nursery: '',
    higher: '',
    internet: '',
    romantic: '',
    famrel: '',
    freetime: '',
    goout: '',
    Dalc: '',
    Walc: '',
    health: '',
    absences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/dane', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formFields = {
    sex: 'Płeć',
    age: 'Wiek',
    famsize: 'Rozmiar rodziny',
    Pstatus: 'Status separacji rodziców',
    Medu: 'Edukacja matki',
    Fedu: 'Edukacja ojca',
    Mjob: 'Praca matki',
    Fjob: 'Praca ojca',
    reason: 'Powód wyboru szkoły',
    guardian: 'Opiekun prawny',
    traveltime: 'Czas podróży do szkoły',
    studytime: 'Czas poświęcony na naukę',
    failures: 'Liczba przeszłych niezaliczonych przedmiotów',
    schoolsup: 'Szkolne dodatkowe wsparcie edukacyjne',
    famsup: 'Wsparcie edukacyjne ze strony rodziny',
    paid: 'Dodatkowe płatne zajęcia edukacyjne',
    activities: 'Dodatkowe zajęcia pozaszkolne',
    nursery: 'Uczęszczanie do przedszkola przed szkołą',
    higher: 'Chęć podjęcia wyższych studiów',
    internet: 'Dostęp do internetu w domu',
    romantic: 'W związku',
    famrel: 'Jakość relacji z rodziną',
    freetime: 'Ilość wolnego czasu',
    goout: 'Ilość wyjść ze znajomymi',
    Dalc: 'Konsumpcja alkoholu w dni robocze',
    Walc: 'Konsumpcja alkoholu w weekendy',
    health: 'Stan zdrowia',
    absences: 'Liczba nieobecności w szkole'
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} style={styles.formField}>
          <label htmlFor={key} style={styles.label}>{formFields[key]}</label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      ))}
      <button type="submit" style={styles.button}>Wyślij</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: '400px'
  },
  formField: {
    marginBottom: '15px'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  input: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Formularz;
