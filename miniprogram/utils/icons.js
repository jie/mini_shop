

const camera = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQwOTY2NzY5NDQyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEzNjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjY2LjYwMTU2MjUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xNjcuNTg0MzM0IDE3MS4xNjYxNjVjMC0xOS41Mjc4MzYgMC0zNy4yODA0MTMgMC01NS43NDMwOTQgNDAuNDc1ODc3IDAgNzkuODg2NiAwIDEyMC4zNjI0NzcgMCAwIDE4LjEwNzYyOSAwIDM1Ljg2MDIwNyAwIDU0LjMyMjg4OCAyNS41NjM3MTIgMi40ODUzNjEgNDcuMjIxODU3IDQuOTcwNzIyIDY2Ljc0OTY5Mi0xOS4xNzI3ODQgMzMuMzc0ODQ2LTQwLjQ3NTg3NyA3MC42NTUyNTktNzcuNzU2MjkxIDEwNy4yMjU1Ny0xMTUuMzkxNzU1QzQ4NS43MTA1MjcgMTAuNjgyODYyIDUxMy43NTk2LTAuNjc4Nzg4IDU0OS4yNjQ3NTUgMC4wMzEzMTZjOTIuNjY4NDU2IDIuMTMwMzA5IDE4NS42OTE5NjMgMS43NzUyNTggMjc4LjcxNTQ3MSAwIDMwLjg4OTQ4NS0wLjM1NTA1MiA1Ni4wOTgxNDYgOC41MjEyMzcgNzYuNjkxMTM2IDI5LjQ2OTI3OSA0MS4xODU5OCA0Mi4yNTExMzUgODEuMzA2ODA2IDg1LjU2NzQyNSAxMjEuNDI3NjMyIDEyOS4yMzg3NjYgOC41MjEyMzcgOS4yMzEzNCAxNi42ODc0MjMgMTIuNDI2ODA0IDI5LjExNDIyOCAxMi40MjY4MDQgNjYuNzQ5NjkyLTAuNzEwMTAzIDEzMy44NTQ0MzYtMC4zNTUwNTIgMjAwLjYwNDEyOS0wLjM1NTA1MiA2My4xOTkxNzcgMCAxMDguMjkwNzI0IDQ1LjA5MTU0NyAxMDguNjQ1Nzc2IDEwOC4yOTA3MjQgMCAyMDguNzcwMzE0LTAuMzU1MDUyIDQxNy41NDA2MjkgMC4zNTUwNTIgNjI2LjMxMDk0MyAwIDU2LjA5ODE0Ni00My42NzEzNDEgMTE4LjIzMjE2OC0xMTcuMTY3MDEzIDExNy44NzcxMTYtMzczLjE1OTE4NC0xLjQyMDIwNi03NDYuNjczNDItMS40MjAyMDYtMTExOS44MzI2MDQgMC02Ni4zOTQ2NDEgMC4zNTUwNTItMTI4LjUyODY2My01OS4yOTM2MS0xMjcuNDYzNTA4LTEyNy44MTg1NiAyLjQ4NTM2MS0yMDIuNzM0NDM4IDIuMTMwMzA5LTQwNS44MjM5MjcgMC4zNTUwNTItNjA4LjU1ODM2NS0wLjcxMDEwMy02Ny44MTQ4NDcgNTYuODA4MjQ5LTExNS43NDY4MDcgMTE1LjM5MTc1NS0xMTYuMTAxODU4QzEzMi4wNzkxNzggMTcxLjE2NjE2NSAxNDguNzY2NjAyIDE3MS4xNjYxNjUgMTY3LjU4NDMzNCAxNzEuMTY2MTY1ek0zNzkuOTA1MTY0IDU3OS4xMjA0MDJjMCAxNjcuMjI5MjgyIDEzNC4yMDk0ODggMzAyLjUwMzkyNSAzMDEuMDgzNzE5IDMwMi44NTg5NzYgMTY4LjI5NDQzNyAwLjM1NTA1MiAzMDMuOTI0MTMxLTEzMy44NTQ0MzYgMzA0LjI3OTE4My0zMDEuNDM4NzcgMC4zNTUwNTItMTY4LjI5NDQzNy0xMzQuMjA5NDg4LTMwMy41NjkwNzktMzAyLjE0ODg3My0zMDMuOTI0MTMxQzUxNS4xNzk4MDYgMjc2LjYxNjQ3NyAzNzkuOTA1MTY0IDQxMS4xODEwMTYgMzc5LjkwNTE2NCA1NzkuMTIwNDAyek0xMDIzLjk2ODY4NCAzNDQuMDc2MjcyYzIwLjU5Mjk5IDAgMzkuNzY1Nzc0IDAgNTguMjI4NDU1IDAgMC0yMC4yMzc5MzkgMC0zOS40MTA3MjMgMC01OC4yMjg0NTUtMjAuMjM3OTM5IDAtMzguNzAwNjE5IDAtNTguMjI4NDU1IDBDMTAyMy45Njg2ODQgMzA1LjM3NTY1MyAxMDIzLjk2ODY4NCAzMjMuODM4MzM0IDEwMjMuOTY4Njg0IDM0NC4wNzYyNzJ6IiBwLWlkPSIxOTE5IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PHBhdGggZD0iTTY4Mi4wNTQwMzcgMzMyLjAwNDUxOWMxMzUuOTg0NzQ2IDIuNDg1MzYxIDI0Ni43NjA4MzEgMTA0Ljc0MDIwOSAyNDcuNDcwOTM0IDI0Ni40MDU3NzkgMS4wNjUxNTUgMTM4LjExNTA1NS0xMDYuNTE1NDY2IDI0Ni43NjA4MzEtMjQ3LjExNTg4MiAyNDguMTgxMDM3LTEzNS4yNzQ2NDIgMS40MjAyMDYtMjQ2Ljc2MDgzMS0xMTEuNDg2MTg4LTI0Ny40NzA5MzQtMjQ3LjExNTg4MkM0MzQuNTgzMTAzIDQ0NC45MTA5MTQgNTQ1LjcxNDI0IDMzMy40MjQ3MjYgNjgyLjA1NDAzNyAzMzIuMDA0NTE5ek02ODIuNDA5MDg5IDY5My4wOTE5NTFjNjEuMDY4ODY3IDAgMTEzLjI2MTQ0Ni01MS40ODI0NzUgMTEzLjk3MTU0OS0xMTIuNTUxMzQzIDAuNzEwMTAzLTYxLjc3ODk3MS01MS40ODI0NzUtMTE0LjY4MTY1Mi0xMTMuNjE2NDk4LTExNC42ODE2NTItNjEuMDY4ODY3IDAtMTEyLjkwNjM5NCA1MS4xMjc0MjQtMTEzLjk3MTU0OSAxMTIuNTUxMzQzQzU2OC4wODI0ODggNjM5LjgzNDIxOCA2MjAuMjc1MDY2IDY5My4wOTE5NTEgNjgyLjQwOTA4OSA2OTMuMDkxOTUxeiIgcC1pZD0iMTkyMCIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=='


const namecard = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQwOTY3ODA5MjAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzU2Ljc1MTM2IDM0OC44MzA3MiA3MDIuMzYxNiAzNDguODMwNzJjLTE1LjAzMjMyIDAtMjcuMTk3NDQgMTIuMTkwNzItMjcuMTk3NDQgMjcuMTk3NDRsMCA1NC4zODk3NmMwIDE1LjAzMjMyIDEyLjE2NTEyIDI3LjE5NzQ0IDI3LjE5NzQ0IDI3LjE5NzQ0bDU0LjM4OTc2IDBjMTUuMDMyMzIgMCAyNy4xOTIzMi0xMi4xNjUxMiAyNy4xOTIzMi0yNy4xOTc0NEw3ODMuOTQzNjggMzc2LjAyODE2Qzc4My45Mzg1NiAzNjEuMDIxNDQgNzcxLjc3ODU2IDM0OC44MzA3MiA3NTYuNzUxMzYgMzQ4LjgzMDcyeiIgcC1pZD0iMjUyOSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik04MzguMzI4MzIgMTkwLjc5MTY4IDE4NS42NzE2OCAxOTAuNzkxNjhjLTYwLjA3Mjk2IDAtMTA4Ljc3OTUyIDQ4LjcwNjU2LTEwOC43Nzk1MiAxMDguNzc5NTJsMCA0MzUuMTAyNzJjMCA2MC4wNzI5NiA0OC43MDY1NiAxMDguNzc5NTIgMTA4Ljc3OTUyIDEwOC43Nzk1Mmw2NTIuNjYxNzYgMGM2MC4wNjc4NCAwIDEwOC43NzQ0LTQ4LjcwNjU2IDEwOC43NzQ0LTEwOC43Nzk1Mkw5NDcuMTA3ODQgMjk5LjU2NjA4Qzk0Ny4xMDI3MiAyMzkuNDkzMTIgODk4LjQwMTI4IDE5MC43OTE2OCA4MzguMzI4MzIgMTkwLjc5MTY4ek01MzkuMTk3NDQgNzI5LjU0ODggMjEyLjg2NCA3MjkuNTQ4OGMtMTUuMDMyMzIgMC0yNy4xOTc0NC0xMi4xNi0yNy4xOTc0NC0yNy4xOTIzMnMxMi4xNi0yNy4xOTc0NCAyNy4xOTc0NC0yNy4xOTc0NGwzMjYuMzI4MzIgMGMxNS4wMjcyIDAgMjcuMTk3NDQgMTIuMTY1MTIgMjcuMTk3NDQgMjcuMTk3NDRTNTU0LjIyNDY0IDcyOS41NDg4IDUzOS4xOTc0NCA3MjkuNTQ4OHpNNTM5LjE5NzQ0IDYyMC43Nzk1MiAyMTIuODY0IDYyMC43Nzk1MmMtMTUuMDMyMzIgMC0yNy4xOTc0NC0xMi4xNzAyNC0yNy4xOTc0NC0yNy4yMDI1NiAwLTE1LjAwMTYgMTIuMTYtMjcuMTkyMzIgMjcuMTk3NDQtMjcuMTkyMzJsMzI2LjMyODMyIDBjMTUuMDI3MiAwIDI3LjE5NzQ0IDEyLjE5MDcyIDI3LjE5NzQ0IDI3LjE5MjMyQzU2Ni4zODk3NiA2MDguNjA5MjggNTU0LjIyNDY0IDYyMC43Nzk1MiA1MzkuMTk3NDQgNjIwLjc3OTUyek04MzguMzI4MzIgNDU3LjYxMDI0YzAgMzAuMDM5MDQtMjQuMzUwNzIgNTQuMzg5NzYtNTQuMzg5NzYgNTQuMzg5NzZsLTEwOC43NzQ0IDBjLTMwLjAzMzkyIDAtNTQuMzg5NzYtMjQuMzUwNzItNTQuMzg5NzYtNTQuMzg5NzZMNjIwLjc3NDQgMzQ4LjgzNTg0YzAtMzAuMDMzOTIgMjQuMzU1ODQtNTQuMzg5NzYgNTQuMzg5NzYtNTQuMzg5NzZsMTA4Ljc3NDQgMGMzMC4wMzkwNCAwIDU0LjM4OTc2IDI0LjM1MDcyIDU0LjM4OTc2IDU0LjM4OTc2TDgzOC4zMjgzMiA0NTcuNjEwMjR6IiBwLWlkPSIyNTMwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+'



module.exports = {
  camera: camera,
  namecard: namecard
}