import Swal from 'sweetalert2';

const changeTheme = () => {
    var colors = document.getElementsByName('theme');
  if (colors[0].value == 'BLACK') {
    document.body.style.backgroundColor = 'black';
  }
  if (colors[0].value == 'WHITE') {
        document.body.style.backgroundColor = 'white';
  }
  Swal.fire({
      icon: 'success',
      text: "Color changed to " + colors[0].value,
    });
  console.log(document.getElementsByName('theme'));
}

const ThemeChanger = ({}) => {
    return(
        <select name="theme" onChange={changeTheme}>
            <option value="-">Valitse Teema</option>
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
        </select>
    );
}

export default ThemeChanger;