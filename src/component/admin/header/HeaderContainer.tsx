/* eslint-disable */
import './headeradmin.css'

export function HeaderContainer({ name }: { name: string }) {
  return (
    <div className='headercontainer'>
      <div className='headercontainer-left'>
        <i className='fa-solid fa-house'></i>
        <h3>{name}</h3>
      </div>
      <div className='headercontainer-right'>
        <div className='headercontainer-right-search'>
          <input id='searchcontainer' type='text' placeholder='Search...' />
          <label htmlFor='searchcontainer'>
            <button>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </label>
        </div>
        <div className='headercontainer-right-notify'>
          <i className='fa-solid fa-bell'></i>
        </div>
      </div>
    </div>
  )
}
