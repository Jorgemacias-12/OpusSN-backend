export const createUserErrorMessages = {
  nameRequired: 'El nombre es requerido',
  nameLength: "El tamaño el nombre debe ser entre 4 y 50 caracteres",
  lastnameRequired: 'El apellido es requerido',
  lastnameLength: 'El tamaño del apellido debe ser entre 5 y 30 caracteres',
  emailRequired: 'El email es requerido',
  emailLength: 'La longitud del mail no es válida',
  emailIsNotValid: "El email no es válido",
  usernameRequired: 'El nombre de usuario es requerido',
  usernameLength: 'El nombre de usuario debe tener entre 3 y 15 caracteres',
  usernameCharacters: 'El nombre de usuario solo puede contener letras, números , guiones y guiones bajos',
  usernameAlreadyExists: 'El nombre de usuario se encuentra en uso :C',
  passwordRequired: 'No puedes dejar el campo de contraseña vacio'
}

export const createCategoryErrorMessages = {
  categoryNameRequired: 'El nombre de la categoría no debe estar vacio.',
  categoryLength: 'El tamaño de la categoría debe ser entre 5 y 20 caracteres'
}

export const createPostErrorMessages = {
  postTitleRequired: 'Para crear un post necesitas nombrarlo',
  postTitleLength: 'El titulo de un post debe estar entre 5 y 40 caracteres',
  postContentRequired: 'No puedes publicar un post vació.',
  postDateRequired: 'La fecha de creación del post es requerida',
  postIsValidDate: 'La fecha de creación no es válida',
  postCategoryRequired: 'Al menos una categoría es necesaria para crear un post'
}