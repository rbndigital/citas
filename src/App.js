import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas,addCita] = useState(citasIniciales);

  useEffect(() => {
    
    if(citasIniciales){

      localStorage.setItem('citas',JSON.stringify(citas));
    }else{

      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas]);

  const crearCita = cita => {

    addCita([
      ...citas,
         cita
    ]);
  }

  const eliminarCitaById = id => {
    
    const newCitas = citas.filter(cita => cita.id !== id);

    addCita(newCitas);
  }

  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas';

  return (

    <Fragment>
      <h1>Administración de Pacientes</h1>

      <div className="container">
        <div className="row">
          
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>

          <div className="one-half column">
          <h2>{titulo}</h2>

            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCitaById={eliminarCitaById}
              /> 
            ))}

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
