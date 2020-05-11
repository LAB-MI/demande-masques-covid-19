# Qualité de code

Plusieurs scripts sont automatisés pour maintenir la qualité du code :

```shell script
# Lancer le linter
yarn lint 

# Lancer les tests de navigateur (cypress)
# En ouvrant la console cypress (dev)
yarn test:browser:open

# En headless (CI)
yarn test:browser
```

Enfin, nous utilisons `prettier` pour formatter automatiquement notre code. Nous utilisons en particulier
`lint-staged` pour formatter automatiquement le code avant de commiter.