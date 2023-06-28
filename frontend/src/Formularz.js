import React, { useState } from "react";

const Formularz = () => {
  const [formData, setFormData] = useState({
    sex: "M",
    age: "15",
    famsize: "LT3",
    Pstatus: "T",
    Medu: "3",
    Fedu: "3",
    Mjob: "other",
    Fjob: "other",
    reason: "reputation",
    guardian: "mother",
    traveltime: "1",
    studytime: "2",
    failures: "0",
    schoolsup: "1",
    famsup: "1",
    paid: "1",
    activities: "0",
    nursery: "0",
    higher: "1",
    internet: "1",
    romantic: "0",
    famrel: "3",
    freetime: "3",
    goout: "3",
    Dalc: "3",
    Walc: "3",
    health: "3",
    absences: "10",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function setInnerHTML(elm, html) {
    elm.innerHTML = html;

    Array.from(elm.querySelectorAll("script")).forEach((oldScriptEl) => {
      const newScriptEl = document.createElement("script");

      Array.from(oldScriptEl.attributes).forEach((attr) => {
        newScriptEl.setAttribute(attr.name, attr.value);
      });

      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);

      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageRegex = /^[0-9]+$/;

    // Walidacja pola "age"
    if (formData.age.trim() === "" || !formData.age.match(ageRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Wprowadź poprawny wiek (liczba)",
      }));
      return;
    }

    console.log(formData)

    fetch("http://localhost:8001/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const html = await response.text();
        console.log(html);
        setInnerHTML(document.getElementById("explanation"), html);
        // console.log(await response.text());
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formFields = {
    sex: "Płeć",
    age: "Wiek",
    famsize: "Rozmiar rodziny",
    Pstatus: "Status separacji rodziców",
    Medu: "Edukacja matki",
    Fedu: "Edukacja ojca",
    Mjob: "Praca matki",
    Fjob: "Praca ojca",
    reason: "Powód wyboru szkoły",
    guardian: "Opiekun prawny",
    traveltime: "Czas podróży do szkoły",
    studytime: "Czas poświęcony na naukę",
    failures: "Liczba przeszłych niezaliczonych przedmiotów",
    schoolsup: "Szkolne dodatkowe wsparcie edukacyjne",
    famsup: "Wsparcie edukacyjne ze strony rodziny",
    paid: "Dodatkowe płatne zajęcia edukacyjne",
    activities: "Dodatkowe zajęcia pozaszkolne",
    nursery: "Uczęszczanie do przedszkola przed szkołą",
    higher: "Chęć podjęcia wyższych studiów",
    internet: "Dostęp do internetu w domu",
    romantic: "W związku",
    famrel: "Jakość relacji z rodziną",
    freetime: "Ilość wolnego czasu",
    goout: "Ilość wyjść ze znajomymi",
    Dalc: "Konsumpcja alkoholu w dni robocze",
    Walc: "Konsumpcja alkoholu w weekendy",
    health: "Stan zdrowia",
    absences: "Liczba nieobecności w szkole",
  };

  const RadioButton = ({ name, value, onChange, style }) => {
    return (
        <input class='radiobtn' type='radio' checked={formData[name]===value} name={name} onChange={onChange} style={style} value={value}/>
    );
  };

  const input_type = (key, value) => {
    switch(key){
      case 'sex':
        return(
          <div>
            <span>Mężczyzna</span><RadioButton name={key} value='M' onChange={handleChange} style={styles.input}/>
            <span>Kobieta</span><RadioButton name={key} value='F' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'famsize':
        return (
        <div>
          <span>Mniejszy niż 4 osoby</span><RadioButton name={key} value='LE3' onChange={handleChange} style={styles.input}/>
          <span>4 osoby lub więcej</span><RadioButton name={key} value='GT3' onChange={handleChange} style={styles.input}/>
        </div>
        )
      case 'Pstatus':
          return (
          <div>
            <span>Żyją razem</span><RadioButton name={key} value='T' onChange={handleChange} style={styles.input}/>
            <span>W separacji</span><RadioButton name={key} value='A' onChange={handleChange} style={styles.input}/>
          </div>
          )
      case 'Medu':
      case 'Fedu':
        return (
        <div>
          <span>Brak</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
          <span>Podstawowe</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
          <span>Gimnazjalne</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
          <span>Średnie</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          <span>Wyższe</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
        </div>
        )
      case 'Mjob':
      case 'Fjob':
        return (
          <div>
            <span>Praca w domu</span><RadioButton name={key} value='at_home' onChange={handleChange} style={styles.input}/>
            <span>Inne</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
            <span>Służba zdrowia</span><RadioButton name={key} value='health' onChange={handleChange} style={styles.input}/>
            <span>Nauczyciel</span><RadioButton name={key} value='teacher' onChange={handleChange} style={styles.input}/>
            <span>Usługi</span><RadioButton name={key} value='services' onChange={handleChange} style={styles.input}/>
          </div>
          )
      case 'reason':
        return (
          <div>
            <span>Blisko domu</span><RadioButton name={key} value='close' onChange={handleChange} style={styles.input}/>
            <span>Preferowany program</span><RadioButton name={key} value='course' onChange={handleChange} style={styles.input}/>
            <span>Reputacja szkoły</span><RadioButton name={key} value='reputation' onChange={handleChange} style={styles.input}/>
            <span>Inne</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'guardian':
        return (
          <div>
            <span>Mama</span><RadioButton name={key} value='mother' onChange={handleChange} style={styles.input}/>
            <span>Tata</span><RadioButton name={key} value='father' onChange={handleChange} style={styles.input}/>
            <span>Inny</span><RadioButton name={key} value='other' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'traveltime':
        return (
          <div>
            <span>mniej niż 15 minut</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/> 
            <span>15 do 30 minut</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>30 minut do godziny</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Ponad godzina</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'studytime':
        return (
          <div>
            <span>mniej niż 2 godziny</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
            <span>2 do 5 godzin</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>5 do 10 godzin</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Ponad 10 godzin</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'schoolsup':
      case 'famsup':
      case 'paid':
      case 'activities':
      case 'nursery':
      case 'higher':
      case 'internet':
      case 'romantic':
        return(
          <div>
            <span>Tak</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>Nie</span><RadioButton name={key} value='0' onChange={handleChange} style={styles.input}/>
          </div>
        )
      case 'famrel':
      case 'health':
        return(
          <div>
            <span>Bardzo złe</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/>
            <span>Złe</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Przeciętne</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
            <span>Dobre</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
            <span>Wspaniałe</span><RadioButton name={key} value='5' onChange={handleChange} style={styles.input}/>
          </div>
        )

      case 'freetime':
      case 'goout':
      case 'Dalc':
      case 'Walc':
        return(
          <div>
            <span>Bardzo mało</span><RadioButton name={key} value='1' onChange={handleChange} style={styles.input}/> 
            <span>Mało</span><RadioButton name={key} value='2' onChange={handleChange} style={styles.input}/>
            <span>Przeciętne</span><RadioButton name={key} value='3' onChange={handleChange} style={styles.input}/>
            <span>Dużo</span><RadioButton name={key} value='4' onChange={handleChange} style={styles.input}/>
            <span>Bardzo dużo</span><RadioButton name={key} value='5' onChange={handleChange} style={styles.input}/>
          </div>
        )

      default:  
        return (<input
          type="text"
          id={key}
          name={key}
          value={value}
          onChange={handleChange}
          style={styles.input}
        />)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <table>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td>
                  <label htmlFor={key} style={styles.label}>
                    {formFields[key]}
                  </label>
                </td>
                <td>
                  {input_type(key, value)}

                  {errors[key] && (
                    <span style={styles.error}>{errors[key]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={styles.button}>
          Wyślij
        </button>
      </form>
      <div id="explanation"></div>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    maxWidth: "1000px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "5px",
  },
};

export default Formularz;
