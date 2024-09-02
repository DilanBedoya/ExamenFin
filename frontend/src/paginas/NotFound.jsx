
import {Link} from 'react-router-dom'


export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Página no encontrada</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Lo sentimos, la página que estás buscando no ha sido encontrada</p>
                
                <Link to="/" className="p-3 m-5 w-full text-center  bg-gray-600 text-slate-300  border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Salir</Link>

            </div>
        </div>
    )
}

export default NotFound;