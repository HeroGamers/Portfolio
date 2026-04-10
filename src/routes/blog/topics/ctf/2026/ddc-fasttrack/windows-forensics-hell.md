# Windows Forensics Hell

Walkthrough by Hero

---

> So ehmm… I tried moving away from Windows to support the OSS movement, but somehow it went wrong and now I have gotten a virus? I though viruses were only for Windows??

---

## Zip Inspection

```txt [24]
❯ 7z l foren_windows_forensics_hell.7z

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=en_DK.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs x64)

Scanning the drive for archives:
1 file, 5878192676 bytes (5606 MiB)

Listing archive: foren_windows_forensics_hell.7z


Enter password (will not be echoed):
--
Path = foren_windows_forensics_hell.7z
Type = 7z
Physical Size = 5878192676
Headers Size = 228
Method = LZMA2:24 7zAES
Solid = -
Blocks = 1

   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2026-02-19 23:33:24 ....A   6041435219   5878192448  challenge.E01
------------------- ----- ------------ ------------  ------------------------
2026-02-19 23:33:24         6041435219   5878192448  1 files
```

---

## Disk Image

```txt
❯ 7z x foren_windows_forensics_hell.7z
❯ file challenge.E01
challenge.E01: EWF/Expert Witness/EnCase image file format
```

EnCase disk image, nice! Guess we don't have to suffer with memory forensics!
_(slight foreshadowing for SOC Nightmares)_

---

## Checking the image layout

We use SleuthKit

```txt
❯ mmls challenge.E01
GUID Partition Table (EFI)
Offset Sector: 0
Units are in 512-byte sectors
      Slot      Start        End          Length       Description
000:  Meta      0000000000   0000000000   0000000001   Safety Table
001:  -------   0000000000   0000002047   0000002048   Unallocated
002:  Meta      0000000001   0000000001   0000000001   GPT Header
003:  Meta      0000000002   0000000033   0000000032   Partition Table
004:  000       0000002048   0000004095   0000002048
005:  001       0000004096   0001054719   0001050624   EFI System Partition
006:  002       0001054720   0041940991   0040886272
007:  -------   0041940992   0041943039   0000002048   Unallocated
```

---

## Finding the main partition

```txt [1|4-15|41|21-22]
❯ fsstat -o 0001054720 challenge.E01 | head -n 58
FILE SYSTEM INFORMATION
--------------------------------------------
File System Type: Ext4
Volume Name:
Volume ID: dd36b3efebbcb7b835428220cab028e0

Last Written at: 2026-02-19 22:14:00 (CET)
Last Checked at: 2026-02-19 20:36:17 (CET)

Last Mounted at: 2026-02-19 22:14:02 (CET)
Unmounted properly
Last mounted on: /

Source OS: Linux
Dynamic Structure
Compat Features: Journal, Ext Attributes, Resize Inode, Dir Index
InCompat Features: Filetype, Extents, 64bit, Flexible Block Groups,
Read Only Compat Features: Sparse Super, Large File, Huge File, Extra Inode Size

Journal ID: 00
Journal Inode: 8

METADATA INFORMATION
--------------------------------------------
Inode Range: 1 - 1277953
Root Directory: 2
Free Inodes: 1032519
Inode Size: 256

CONTENT INFORMATION
--------------------------------------------
Block Groups Per Flex Group: 16
Block Range: 0 - 5110783
Block Size: 4096
Free Blocks: 1888126

BLOCK GROUP INFORMATION
--------------------------------------------
Number of Block Groups: 156
Inodes per group: 8192
Blocks per group: 32768

Group: 0:
  Block Group Flags: [INODE_ZEROED]
  Inode Range: 1 - 8192
  Block Range: 0 - 32767
  Layout:
    Super Block: 0 - 0
    Group Descriptor Table: 1 - 3
    Group Descriptor Growth Blocks: 4 - 1027
    Data bitmap: 1028 - 1028
    Inode bitmap: 1044 - 1044
    Inode Table: 1060 - 1571
    Data Blocks: 9252 - 32767
  Free Inodes: 8175 (99%)
  Free Blocks: 22998 (70%)
  Total Directories: 2
  Stored Checksum: 0x0295
```

---

## Analyzing the main partition

We dump it to a file first, and check structure of fs

```txt [1|2|3|27|36-42|39|48]
❯ mmcat challenge.E01 6 > vol6.raw
❯ fls -o 0001054720 challenge.E01
d/d 786433:     home
d/d 11: lost+found
d/d 262145:     boot
r/r 13: swapfile
d/d 524289:     etc
d/d 1048577:    media
l/l 14: bin
d/d 393217:     dev
d/d 655361:     var
l/l 15: lib
l/l 16: lib64
d/d 917505:     mnt
d/d 786434:     opt
d/d 524291:     proc
d/d 393218:     root
d/d 917506:     run
l/l 17: sbin
d/d 1048578:    srv
d/d 524292:     sys
d/d 262147:     tmp
d/d 393219:     usr
d/d 1048579:    cdrom
V/V 1277953:    $OrphanFiles
❯ fls -o 0001054720 challenge.E01 786433
d/d 803659:     jens
❯ fls -o 0001054720 challenge.E01 803659
r/r 803660:     .bash_logout
d/d 803661:     Templates
r/r 803664:     .profile
r/r 803665:     .bashrc
d/d 803666:     .config
d/d 827877:     .local
d/d 827884:     .cache
d/d 827886:     Desktop
d/d 827887:     Downloads
d/d 827888:     Public
d/d 827889:     Documents
d/d 827890:     Music
d/d 827891:     Pictures
d/d 827892:     Videos
d/d 827958:     .mozilla
r/r 803649:     .sudo_as_admin_successful
r/r 828579:     .bash_history
d/d 827932:     .wine
❯ fls -o 0001054720 challenge.E01 827889
r/r 828428:     flag.ddc.enc
```

---

## Saving the encrypted flag to disk

```txt
❯ icat -o 0001054720 ../challenge.E01 828428 > flag.ddc.enc
❯ file flag.ddc.enc
flag.ddc.enc: data
❯ cat flag.ddc.enc
�Dn�$~$BU#�)ϛ�NΟu��?
```

---

## Let's try it a little easier

Introducing Autopsy

_Which sadly works best on Windows..._

---

Finding the same file in Autopsy

![Autopsy window showing flag.ddc.enc being found in the data sources pane in Autopsy](/blog/topics/ctf/2026/ddc-fasttrack/autopsy-finding-encflag.png)

---

## What else?

After running the ingestion module `Recent Activity` we get Firefox browsing history, showing a suspicious download (with filesize!)

![Autopsy window showing Firefox downloaded update.exe](/blog/topics/ctf/2026/ddc-fasttrack/autopsy-finding-update-size.png)

---

## Where file?

No matter where we look, the file seems to have been deleted - the inodes are freed and have been used by other things.

So, now what?

---

## File Carving

Looking for file signatures on the filesystem without the filesystem helping us

`bulk_extractor`, `binwalk`, `foremost`, `photorec`, among others can be used

---

Autopsy comes equipped with PhotoRec Carver

![Running the PhotoRec Carver ingestion module in Autopsy](/blog/topics/ctf/2026/ddc-fasttrack/autopsy-photorec-ingest.png)

---

Sorting executables by filesize, we look near the original filesize and find a file with suspicious strings

![Carving out update.exe with Autopsy](/blog/topics/ctf/2026/ddc-fasttrack/autopsy-carve-update.png)

---

You thought Nim rev was hard? Imagine trying to reverse the encryption function with huge missing chunks

![attempting to rev the malware with missing pieces](/blog/topics/ctf/2026/ddc-fasttrack/binja-rev-attempt.png)

_\<Insert 'this is useless' meme\>_

---

## Whoops?

> So ehmmm - our disk-reader was apparently malfunctioning and the investigator never noticed... as a result some of the data to recover the full virus is corrupted. Luckily the investigator found another backup! Therefore, here's a uncorrupted version of the virus.

---

> However virus's are dangerous so we can't just hand it out to anyone, we have password-protected it with the uppercase sha256 sum of the corrupted virus so only those who have already recovered the corrupted virus can open it.
>
> If you believe you have the complete corrupted virus, but the hash isn't working, please open a ticket and we can help sanity check.

---

## Praying we got the right hash

```txt [2|16]
❯ sha256sum 514133-f0846864.exe | tr a-z A-Z
D0A890F71BB39D8EA2569779346D07A4B7E8E3AB05AAB0E31AE4FCC078C7FE34  514133-F0846864.EXE
❯ 7z l Windows\ Forensics\ Hell\ appendix\ -\ bad\ author\ edition.7z

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=en_DK.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs x64)

Scanning the drive for archives:
1 file, 110738 bytes (109 KiB)

Listing archive: ../Windows Forensics Hell appendix - bad author edition.7z


Enter password (will not be echoed):

ERROR: ../Windows Forensics Hell appendix - bad author edition.7z : Can not open encrypted archive. Wrong password?
```

---

## Uh-oh, what now?

Remember the raw volume we saved? Time to look for a needle in a haystack!

```py [3-4|7|10-11|20-21]
import mmap

carved = "update.exe" # partial PhotoRec file
image  = "vol6.raw"

with open(carved, "rb") as f:
    needle = f.read(65536) # first 64 KiB signature

with open(image, "rb") as f:
    mm = mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ)
    off = mm.find(needle)
    if off < 0:
        print("not found")
        exit(1)
    print("candidate offset (dec):", off)
    print("candidate offset (hex):", hex(off))

    # check carved match
    with open(carved, "rb") as c:
        full = c.read()
    if mm[off:off+len(full)] == full:
        print("full carved file matches at this offset")
    else:
        print("prefix matched but full file mismatch")
```

---

## In DFIR it's always Halloween

Run and carve your malware(-pumpkin) manually!

```txt [3|5|10|34]
❯ uv run find_needle.py
candidate offset (dec): 18678284288
candidate offset (hex): 0x459500000
full carved file matches at this offset
❯ dd if=vol6.raw of=update_full.exe iflag=skip_bytes,count_bytes skip=$((0x459500000)) count=517972 status=progress
1011+1 records in
1011+1 records out
517972 bytes (518 kB, 506 KiB) copied, 0,0039812 s, 130 MB/s
❯ sha256sum update_full.exe  | tr a-z A-Z
4AC23960E0D1F9D5165F6E8D7029DA94199971A2686C1068BE4936FED397DBD6  UPDATE_FULL.EXE
❯ 7z l Windows\ Forensics\ Hell\ appendix\ -\ bad\ author\ edition.7z

7-Zip [64] 17.05 : Copyright (c) 1999-2021 Igor Pavlov : 2017-08-28
p7zip Version 17.05 (locale=en_DK.UTF-8,Utf16=on,HugeFiles=on,64 bits,8 CPUs x64)

Scanning the drive for archives:
1 file, 110738 bytes (109 KiB)

Listing archive: Windows Forensics Hell appendix - bad author edition.7z


Enter password (will not be echoed):
--
Path = Windows Forensics Hell appendix - bad author edition.7z
Type = 7z
Physical Size = 110738
Headers Size = 226
Method = LZMA2:19 BCJ 7zAES
Solid = -
Blocks = 1

   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2026-02-19 22:27:59 ....A       517972       110512  update.exe
------------------- ----- ------------ ------------  ------------------------
2026-02-19 22:27:59             517972       110512  1 files
```

---

## File Encryption Flow

Back to Nim reversing we _Go_!

![Graph view of the generateKey and aesEncrypt functions](/blog/topics/ctf/2026/ddc-fasttrack/binja-graph-encrypt.png)

---

## Key Generation

Uses the Nim frame's `procname` (8) field along with the string with the full path of the update.nim file

```c [22|27]
140038e8b    uint64_t* generateKey__update_u13(uint64_t* arg1)

140038e8b    {
140038e8b        char const* const var_70 = "generateKey";
140038eac        char const* const var_60 =
140038eac            "D:\CTF\DDC\DDC2026\forensics\Windows Forensic Hell\encryptor\update.nim";
140038eb0        int64_t var_68 = 0;
140038eb8        int16_t var_58 = 0;
140038ec5        void* var_78;
140038ec5        nimFrame(&var_78);
140038ecf        void* var_10 = nimErrorFlag();
140038ee3        uint64_t var_38;
140038ee3        __builtin_memset(&var_38, 0, 0x20);
140038ef3        int64_t var_68_1 = 0x13;
140038f02        char const* const var_60_1 =
140038f02            "D:\CTF\DDC\DDC2026\forensics\Windows Forensic Hell\encryptor\update.nim";
140038f06        int64_t var_68_2 = 0x12;
140038f0e        int64_t var_68_3 = 0x13;
140038f16        uint64_t var_48 = 0;
140038f1e        int64_t var_40 = 0;
140038f26        int64_t var_18 = 0;
140038f46        cstrToNimstr(&var_38, *(uint64_t*)(getFrame() + 8));
140038f5a        uint64_t var_88;
140038f5a        rawNewString(&var_88, var_38 + 0x47);
140038f67        var_48 = var_88;
140038f7d        var_88 = 0x47;
140038f81        void* const var_80_1 = &TM__HSZE2vatNNSRvcJy9cWwVYA_36;
140038f90        appendString(&var_48, &var_88);
140038f9d        var_88 = var_38;
140038fa1        int64_t* var_30;
140038fa1        int64_t* var_80_2 = var_30;
140038fb0        appendString(&var_48, &var_88);
140038fb5        uint64_t rax_6 = var_48;
140038fc5        int64_t var_68_4 = 0x18a;
140038fd4        char const* const var_60_2 = "C:\Program Files\Nim\nim-2.2.4\lib\system.nim";
140038fd4
140038ffb        if (var_30 && !(0x4000000000000000 & *(uint64_t*)var_30))
140039004            deallocShared(var_30);
140039004
14003900a        popFrame();
14003901b        *(uint64_t*)arg1 = rax_6;
14003901e        int64_t var_80;
14003901e        arg1[1] = var_80;
14003902e        return arg1;
140038e8b    }
```

---

## Finding the IV

In the `aesEncrypt` function we find a reference to `TM__HSZE2vatNNSRvcJy9cWwVYA_38`, which holds the IV

```c [23]
1400398be    int64_t* aesEncrypt__update_u15(int64_t* arg1, int64_t* arg2, int64_t* arg3)

1400398be    {
1400398be        int64_t* rax = *(uint64_t*)arg2;
1400398dc        int64_t rdx = arg2[1];
1400398eb        int64_t rax_1 = *(uint64_t*)arg3;
1400398ee        int64_t rdx_1 = arg3[1];
140039901        char const* const var_520 = "aesEncrypt";
14003990c        char const* const var_510 =
14003990c            "D:\CTF\DDC\DDC2026\forensics\Windows Forensic Hell\encryptor\update.nim";
140039910        int64_t var_518 = 0;
140039918        int16_t var_508 = 0;
140039925        void* var_528;
140039925        nimFrame(&var_528);
14003992a        char* rax_2 = nimErrorFlag();
140039978        int64_t* var_78;
140039978        __builtin_memset(&var_78, 0, 0x40);
14003999d        void var_88;
14003999d        nimZeroMem(&var_88, 0x10);
1400399a2        int64_t var_518_1 = 0x16;
1400399b1        char const* const var_510_1 =
1400399b1            "D:\CTF\DDC\DDC2026\forensics\Windows Forensic Hell\encryptor\update.nim";
1400399cc        nimCopyMem(&var_88, &TM__HSZE2vatNNSRvcJy9cWwVYA_38, 0x10);
1400399e0        void var_498;
1400399e0        nimZeroMem(&var_498, 0x408);
1400399f1        void var_4b8;
1400399f1        nimZeroMem(&var_4b8, 0x20);
140039a02        void var_4d8;
140039a02        nimZeroMem(&var_4d8, 0x20);
140039a07        int64_t var_518_2 = 0x20;
140039a1a        int64_t rax_5;
140039a1a
140039a1a        rax_5 = !rdx_1 ? 0 : rdx_1 + 8;
140039a1a
140039a35        digest__update_u27(rax_5, rax_1, &var_4d8);
```

---

## Writing the decryptor

```py [5|12|19-20]
from Crypto.Cipher import AES
import hashlib

# Key input = path (TM__HSZE2vatNNSRvcJy9cWwVYA_36) + procname (getFrame() + 8)
key_input = b"D:\\CTF\\DDC\\DDC2026\\forensics\\Windows Forensic Hell\\encryptor\\update.nim" + b"generateKey"
print(f"Key input ({len(key_input)} bytes): {key_input}")

key = hashlib.sha256(key_input).digest()
print(f"AES key: {key.hex()}")

# IV from TM__HSZE2vatNNSRvcJy9cWwVYA_38
iv = bytes.fromhex("02b5168cfd014263ac0dbf0f98492a5b")
with open("flag.ddc.enc", "rb") as f:
    ct = f.read()

print(f"IV: {iv.hex()}")
print(f"CT: {ct.hex()}")

cipher = AES.new(key, AES.MODE_CBC, iv)
pt = cipher.decrypt(ct)
print(f"decrypted: {pt}")
```

---

## Getting the flag

```txt
❯ uv run decrypt.py
Key input (82 bytes): b'D:\\CTF\\DDC\\DDC2026\\forensics\\Windows Forensic Hell\\encryptor\\update.nimgenerateKey'
AES key: 644e510e27c3c4b5e4805b7899477f7521b06eb018016e9faa5373a71d26164f

IV: 02b5168cfd014263ac0dbf0f98492a5b
CT: ec6e93bb9d44036e11b4e1e2c180247e132442a71655b99623829988e2df29cf9b11aad4fb4ece9f75cdd8b3ce11b43f

decrypted: b'DDC{w0uld_y0u_l1k3_4_f0rk_f0r_th4t_c4rv1ng}\n\x04\x04\x04\x04'
```

Flag got!
`DDC{w0uld_y0u_l1k3_4_f0rk_f0r_th4t_c4rv1ng}`
