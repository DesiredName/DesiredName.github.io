<template>
    <section class="section">
        <header class="section_header">Algorithms</header>
        <article class="section_article">
            <q class="quote" cite="https://en.wikipedia.org/wiki/algorithm">
                <div class="content">
                    In mathematics and computer science, an algorithm is a finite sequence of rigorous
                    instructions, typically used to solve a class of specific problems or to perform a computation.
                </div>
                <footer class="footer">
                    <a class="link" target="_blank" href="https://en.wikipedia.org/wiki/Algorithm">Wiki</a>
                </footer>
            </q>
        </article>
        <footer class="section_footer"></footer>
    </section>

    <section class="section">
        <header class="section_header">Contents</header>
        <article class="section_article">
            <ul class="list">
                <li class="list_entry">
                    <RouterLink class="link" active-class="is-active" to='/algorithms/sort'>Sorting Algorithms</RouterLink>
                    <ul class="list">
                        <li class="list-entry">
                            <RouterLink class="link" active-class="is-active" to="/algorithms/sort/bubble_sort">Bubble Sort
                            </RouterLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>
    </section>
</template>