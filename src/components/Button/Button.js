import s from './Button.module.css'

export default function Button({nextPage, previousPage}) {
  return (
    <>
      <div className="form-container-btn">
        <button
          className={s.btnTopLeft}
          onClick={() => previousPage()}
          type="button"
        >
          Anterior
        </button>
        <button
          className={s.btnTopRigth}
          onClick={() => nextPage()}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
