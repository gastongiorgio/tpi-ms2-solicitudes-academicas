# Checklist de Code Review

## Legibilidad

- [ ] Los nombres de variables y funciones expresan claramente su intención.
- [ ] Las funciones tienen una extensión razonable.
- [ ] El código evita comentarios innecesarios o confusos.
- [ ] No existen valores mágicos o strings repetidos sin una justificación clara.

## Responsabilidades

- [ ] Cada módulo tiene una responsabilidad clara.
- [ ] Los controladores no concentran lógica que debería estar en otros componentes.
- [ ] La lógica de negocio está separada del acceso a datos.
- [ ] Existe una cohesión adecuada dentro de los módulos.

## Duplicación

- [ ] No existen validaciones repetidas innecesariamente.
- [ ] No existe lógica de negocio duplicada.
- [ ] Las operaciones repetidas fueron extraídas cuando corresponde.

## Manejo de errores

- [ ] Los errores son tratados de manera consistente.
- [ ] Los códigos HTTP utilizados son adecuados.
- [ ] Los mensajes de error son claros.

## Base de datos

- [ ] Las consultas están separadas de la lógica de negocio cuando corresponde.
- [ ] No existen credenciales almacenadas en el código.
- [ ] Los datos de entrada son validados antes de utilizarse.

## Pruebas

- [ ] Los casos funcionales principales fueron verificados.
- [ ] Las pruebas continúan pasando después del refactoring.
- [ ] Los cambios no modificaron negativamente el comportamiento externo.

## Documentación

- [ ] El README se encuentra actualizado.
- [ ] Los endpoints principales están documentados.
- [ ] Las decisiones técnicas relevantes fueron registradas.