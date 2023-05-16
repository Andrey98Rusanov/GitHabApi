const inp = document.querySelector('input')
const div = document.querySelector('.container')

const creatElement = (item) => {
    const element = document.createElement('div')
    element.textContent = item.name
    element.classList.add('el')
    div.append(element)
    element.addEventListener('click', () => {
        const repoData = document.createElement('div')
        repoData.classList.add('repoData')
        const list = document.createElement('ul')
        list.classList.add('list')
        const li_name = document.createElement('li')
        li_name.classList.add('li')
        li_name.textContent = `Name: ${item.name}`
        const li_owner = document.createElement('li')
        li_owner.classList.add('li')
        li_owner.textContent = `Owner: ${item.owner.login}`
        const li_stars = document.createElement('li')
        li_stars.classList.add('li')
        li_stars.textContent = `Stars: ${item.stargazers_count}`
        const del = document.createElement('button')
        del.textContent = "Delete"
        del.classList.add('delBtn')
        document.body.append(repoData)
        repoData.append(list)
        repoData.append(del)
        list.append(li_name)
        list.append(li_stars)
        list.append(li_owner)
        let el = document.querySelectorAll('.el')
        el.forEach(el => el.remove())
        inp.value = ""
        del.addEventListener('click', () => repoData.remove())
    })
}

const debounce = (func, delay) => {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

async function getRepo() {
    if (inp.value.split('').every(el => el != " ") && inp.value.length != 0) {
        await fetch(`https://api.github.com/search/repositories?q=${inp.value}in:name&per_page=5`).then((res) => {
        res.json().then(res => {
            let el = document.querySelectorAll('.el')
            let repoData = document.querySelectorAll('.repoData')
            el.forEach(el => el.remove())
            res.items.forEach(item => creatElement(item))
        })
    })
    } else {
        let el = document.querySelectorAll('.el')
        el.forEach(el => el.remove())
    }
}

inp.addEventListener('input', debounce(getRepo, 500))
