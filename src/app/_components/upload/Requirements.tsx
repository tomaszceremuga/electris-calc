import React from 'react'

const Requirements = () => {
  return (
    <div className="p-4 bg-neutral-100 rounded-lg shadow-md w-full md:max-w-md">
          <p className="text-lg font-semibold mb-2">WYMAGANIA</p>
          <div className="text-neutral-700 text-sm">
            <p>Rozmiar &lt;<span className='text-neutral-950 font-bold'> 200MB</span></p>
            <p>Rozszerzenia dla 3D:<span className='text-neutral-950 font-bold'> *.step, *.stp, *.x_t, *.iges, *.igs, *.sldprt</span></p>
            <p>Rozszerzenia dla 2D:<span className='text-neutral-950 font-bold'> *.dwg, *.dxf, *.pdf </span></p>
            <p>Możesz dodać <span className='text-neutral-950 font-bold'> maksymalnie 12 zdjęć </span>, dla lepszej jakości nie przesyłaj <span className='text-neutral-950 font-bold'> folderów ZIP.</span></p>
            <p className="mt-4 font-medium">Domyślnie:</p>
            <ul className="list-disc list-inside ml-4">
              <li> <span className='text-neutral-950 font-bold'> Zagłębione narożniki części </span>są wykonywane <span className='text-red-600 font-bold'>jako zaokrąglone narożniki (fazowania)</span>.</li>
              <li><span className='text-neutral-950 font-bold'>Ostre krawędzie i zadziorności</span> zostaną <span className='text-red-600 font-bold'> usunięte</span>.</li>
            </ul>
          </div>
        </div>
        
  
  )
}

export default Requirements