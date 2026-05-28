import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild('terminal') terminalRef!: ElementRef;

  command = '$ bws-apigen generate';

  outputLines = [
    '🚀 BWS ApiGen CLI',
    '🔑 Using cached credentials for user@email.com',
    '🔎 Scanning entities...',
    'Entities found: 2',
    ' - User',
    ' - Product',
    '🌐 Calling generator API...',
    '📦 Installing generated files...',
    '✅ Generation completed!'
  ];

  displayedCommand = '';
  visibleLines: string[] = [];

  isTyping = true;

  ngOnInit(): void {
    this.typeCommand();
  }

  goTo(where: string) {
    this.router.navigate([where])
  }

  scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (!demoSection) return;

    const headerOffset = 96; // ajuste conforme a altura do seu header sticky
    const elementPosition = demoSection.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ------------------------
  // DIGITAÇÃO HUMANA
  // ------------------------
  typeCommand() {
    let i = 0;

    const type = () => {
      if (i < this.command.length) {
        this.displayedCommand += this.command[i];
        i++;

        const randomSpeed = 20 + Math.random() * 80;
        setTimeout(type, randomSpeed);
      } else {
        this.isTyping = false;

        setTimeout(() => this.playOutput(), 800);
      }
    };

    type();
  }

  // ------------------------
  // OUTPUT PROGRESSIVO
  // ------------------------
  async playOutput() {
    for (const line of this.outputLines) {

      // delay base
      let delayTime = 500 + Math.random() * 400;

      // deixa SUCCESS mais dramático
      if (line.includes('SUCCESS')) {
        delayTime = 800;
      }

      await this.delay(delayTime);

      this.visibleLines.push(line);
      this.scrollToBottom();
    }
  }

  // ------------------------
  // AUTO SCROLL
  // ------------------------
  scrollToBottom() {
    setTimeout(() => {
      if (this.terminalRef) {
        this.terminalRef.nativeElement.scrollTop =
          this.terminalRef.nativeElement.scrollHeight;
      }
    }, 50);
  }
}