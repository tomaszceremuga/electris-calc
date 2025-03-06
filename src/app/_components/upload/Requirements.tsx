import React from 'react'

const Requirements = () => {
  return (
    <div className="p-4  rounded-lg ">
 
      <div className="">
        <p>Rozmiar &lt; 200MB</p>
        <p>Rozszerzenia dla 3D: *.step, *.stp, *.x_t, *.iges, *.igs, *.sldprt</p>
        <p>Rozszerzenia dla 2D: *.dwg, *.dxf, *.pdf</p>
        <p>Możesz dodać maksymalnie 12 zdjęć, dla lepszej jakości nie przesyłaj folderów ZIP.</p>
        <p className="mt-4 font-medium">Domyślnie:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Zagłębione narożniki części są wykonywane jako zaokrąglone narożniki (fazowania).</li>
          <li>Ostre krawędzie i zadziorności zostaną usunięte.</li>
        </ul>
      </div>
    </div>
  )
}

export default Requirements